import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { parties } from '../types/party';

interface VoteCounts {
  [key: string]: number;
}

export const VoteStats = () => {
  const [voteCounts, setVoteCounts] = useState<VoteCounts>({});
  const [loading, setLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const voteCountsRef = doc(db, 'voteCounts', 'totals');
    
    const unsubscribe = onSnapshot(voteCountsRef, (doc) => {
      if (doc.exists()) {
        const counts = doc.data() as VoteCounts;
        setVoteCounts(counts);
        setTotalVotes(Object.values(counts).reduce((a, b) => a + b, 0));
      } else {
        setVoteCounts({});
        setTotalVotes(0);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching vote counts:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Live Voting Statistics</h3>
        <p className="text-sm text-gray-600">Total Votes Cast: {totalVotes}</p>
      </div>
      <div className="p-4 space-y-4">
        {parties.map((party) => {
          const voteCount = voteCounts[party.id] || 0;
          const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
          
          return (
            <div key={party.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={party.logoUrl}
                    alt={`${party.name} logo`}
                    className="h-6 w-6 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/24x24?text=Logo';
                    }}
                  />
                  <span className="text-sm font-medium text-gray-900">{party.name}</span>
                </div>
                <span className="text-sm text-gray-600">{voteCount} votes</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 text-right">{percentage.toFixed(1)}%</p>
            </div>
          );
        })}
      </div>
      <div className="p-4 bg-gray-50 rounded-b-lg">
        <p className="text-xs text-gray-500 text-center">
          Statistics are updated in real-time as votes are cast
        </p>
      </div>
    </div>
  );
};
