import { useState } from 'react';
import { auth, db } from '../firebase';
import { doc, runTransaction } from 'firebase/firestore';
import { parties } from '../types/party';
import toast from 'react-hot-toast';

interface VoteCardProps {
  hasVoted: boolean;
}

export const VoteCard = ({ hasVoted }: VoteCardProps) => {
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const [votingInProgress, setVotingInProgress] = useState(false);

  const handleVote = async () => {
    if (!selectedParty || hasVoted || votingInProgress) {
      return;
    }

    try {
      setVotingInProgress(true);
      const user = auth.currentUser;
      if (!user) {
        toast.error('Please log in to vote');
        return;
      }

      await runTransaction(db, async (transaction) => {
        // Update vote count
        const voteCountsRef = doc(db, 'voteCounts', 'totals');
        const voteCountsDoc = await transaction.get(voteCountsRef);
        
        const currentCounts = voteCountsDoc.exists() ? voteCountsDoc.data() : {};
        const updatedCounts = {
          ...currentCounts,
          [selectedParty]: (currentCounts[selectedParty] || 0) + 1
        };
        
        transaction.set(voteCountsRef, updatedCounts);

        // Update voter profile
        const voterRef = doc(db, 'voters', user.uid);
        transaction.update(voterRef, {
          hasVoted: true,
          votedFor: selectedParty,
        });

        // Record vote
        const voteRef = doc(db, 'votes', user.uid);
        transaction.set(voteRef, {
          userId: user.uid,
          partyId: selectedParty,
          timestamp: new Date().toISOString(),
        });
      });

      toast.success('Your vote has been cast successfully!');
      setSelectedParty(null);
      window.location.reload(); // Refresh to update UI
    } catch (error) {
      console.error('Error casting vote:', error);
      toast.error('Failed to cast vote. Please try again.');
    } finally {
      setVotingInProgress(false);
    }
  };

  if (hasVoted) {
    return (
      <div className="text-center">
        <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-4">
          <p className="font-medium">You have already cast your vote</p>
          <p className="text-sm mt-2">Thank you for participating in the democratic process!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Cast Your Vote</h3>
        <p className="mt-2 text-sm text-gray-600">
          Select a party from the list below and click "Cast Vote" to submit your choice.
          Your vote is secure and anonymous.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {parties.map((party) => (
          <div
            key={party.id}
            onClick={() => !votingInProgress && setSelectedParty(party.id)}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedParty === party.id
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 flex-shrink-0">
                <img
                  src={party.logoUrl}
                  alt={`${party.name} logo`}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/64x64?text=Logo';
                  }}
                />
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-medium text-gray-900">{party.name}</h4>
                <p className="text-sm text-gray-600">Leader: {party.leader}</p>
              </div>
              <div className="flex-shrink-0">
                <div
                  className={`h-6 w-6 rounded-full border-2 ${
                    selectedParty === party.id
                      ? 'border-orange-500 bg-orange-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedParty === party.id && (
                    <svg
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedParty && (
        <div className="mt-6 text-center">
          <button
            onClick={handleVote}
            disabled={votingInProgress}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {votingInProgress ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Casting Vote...
              </>
            ) : (
              'Cast Vote'
            )}
          </button>
          <p className="mt-2 text-sm text-gray-500">
            You are about to vote for {parties.find(p => p.id === selectedParty)?.name}.
            This action cannot be undone.
          </p>
        </div>
      )}
    </div>
  );
};
