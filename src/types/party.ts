export interface Party {
  id: string;
  name: string;
  leader: string;
  logoUrl: string;
  description: string;
}

export const parties: Party[] = [
  {
    id: "dmk",
    name: "Dravida Munnetra Kazhagam (DMK)",
    leader: "M.K. Stalin",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/5/5e/Dravida_Munnetra_Kazhagam_logo.png?20210504000434",
    description: "The Dravida Munnetra Kazhagam (DMK) is one of the oldest and most influential political parties in Tamil Nadu, founded in 1949 by C.N. Annadurai. The party is rooted in the Dravidian movement, which emphasizes social justice, anti-Brahminism, and Tamil nationalism. DMK has been a strong advocate for state autonomy, linguistic pride, and welfare schemes for marginalized communities. Under the leadership of M.K. Stalin, the party has focused on education, healthcare, and infrastructure development. DMK is currently the ruling party in Tamil Nadu and plays a significant role in national politics as part of the opposition coalition, INDIA."
  },
  {
    id: "tvk",
    name: "Tamilaga Vettri Kazhagam",
    leader: "Thalapathy Vijay",
    logoUrl: "https://m.media-amazon.com/images/I/615pLxcn6lL._AC_UY1100_.jpg",
    description: "Tamilaga Vettri Kazhagam is a newly formed political party launched by popular Tamil film actor Thalapathy Vijay in 2024. The party aims to bring a fresh perspective to Tamil Nadu politics, focusing on youth empowerment, corruption-free governance, and social justice. Vijay, who enjoys a massive fan following, has positioned the party as a people-centric movement, promising to address issues like unemployment, education, and healthcare. The party's entry has created significant buzz in Tamil Nadu's political landscape."
  },
  {
    id: "aiadmk",
    name: "All India Anna Dravida Munnetra Kazhagam (AIADMK)",
    leader: "Edappadi K. Palaniswami",
    logoUrl: "https://content.jdmagicbox.com/v2/comp/chennai/m8/044pxx44.xx44.181011201045.x8m8/catalogue/all-india-anna-dravida-munnetra-kazhagam-annai-dmk-chennai-political-party-office-06wsfmyczo.jpg",
    description: "The All India Anna Dravida Munnetra Kazhagam (AIADMK) was founded in 1972 by the iconic actor and former Chief Minister M.G. Ramachandran (MGR). The party has been a dominant force in Tamil Nadu politics, known for its welfare schemes, including the Midday Meal Program. After the death of J. Jayalalithaa, the party has been led by Edappadi K. Palaniswami, who focuses on rural development, agriculture, and social welfare. AIADMK is currently the principal opposition party in Tamil Nadu and has aligned with the BJP at the national level."
  },
  {
    id: "inc",
    name: "Indian National Congress (INC)",
    leader: "K.S. Alagiri",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Indian_National_Congress_hand_logo.svg/1200px-Indian_National_Congress_hand_logo.svg.png",
    description: "The Indian National Congress (INC) is one of India's oldest political parties, founded in 1885. In Tamil Nadu, the party has historically been an ally of the DMK and has played a significant role in the state's politics. The party advocates for secularism, social justice, and economic equality. Under the leadership of K.S. Alagiri, the Tamil Nadu Congress Committee focuses on strengthening the party's grassroots presence and addressing issues like unemployment, education, and healthcare."
  },
  {
    id: "bjp",
    name: "Bharatiya Janata Party (BJP)",
    leader: "K. Annamalai",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRn0HncNub-2OpbNuC5YPTKVhEUcMpUHs3p2iEzY8ZxOaJOgZuK5zfsR-nZj-hVkdN8CA&usqp=CAU",
    description: "The Bharatiya Janata Party (BJP) is the ruling party at the national level and has been making significant inroads into Tamil Nadu politics under the leadership of K. Annamalai. The party emphasizes Hindutva, nationalism, and economic development. In Tamil Nadu, the BJP has been focusing on issues like corruption, infrastructure development, and cultural preservation. The party has also been working to expand its base by aligning with smaller regional parties and attracting youth and urban voters."
  },
  {
    id: "mdmk",
    name: "Marumalarchi Dravida Munnetra Kazhagam (MDMK)",
    leader: "Vaiko",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/MDMK.svg/1200px-MDMK.svg.png",
    description: "The Marumalarchi Dravida Munnetra Kazhagam (MDMK) was founded in 1994 by Vaiko, a former DMK leader. The party is known for its strong stance on Tamil nationalism, human rights, and social justice. MDMK has been a vocal advocate for the rights of Sri Lankan Tamils and has often aligned with the DMK in elections. Vaiko's fiery speeches and commitment to Tamil pride have earned him a loyal following, though the party's electoral success has been limited in recent years."
  },
  {
    id: "pmk",
    name: "Pattali Makkal Katchi (PMK)",
    leader: "Dr. Anbumani Ramadoss",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Pmk_flag.jpg/420px-Pmk_flag.jpg",
    description: "The Pattali Makkal Katchi (PMK) is a caste-based party representing the Vanniyar community, founded by Dr. S. Ramadoss in 1989. The party focuses on social justice, education, and healthcare. Under the leadership of Dr. Anbumani Ramadoss, the party has been advocating for reservation policies, rural development, and environmental conservation. PMK has often aligned with both the DMK and AIADMK, depending on the political scenario."
  },
  {
    id: "vck",
    name: "Viduthalai Chiruthaigal Katchi (VCK)",
    leader: "Thol. Thirumavalavan",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Viduthalai_Chiruthaigal_Katchi_banner.png/250px-Viduthalai_Chiruthaigal_Katchi_banner.png",
    description: "The Viduthalai Chiruthaigal Katchi (VCK) is a Dalit-based political party founded by Thol. Thirumavalavan in 1999. The party is known for its strong advocacy of Dalit rights, social justice, and anti-caste discrimination. VCK has been a vocal critic of caste-based violence and inequality and has aligned with the DMK in recent elections. The party's influence is significant in northern Tamil Nadu, particularly among Dalit communities."
  },
  {
    id: "ntk",
    name: "Naam Tamilar Katchi (NTK)",
    leader: "Seeman",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHl5oG5Q_fhsLpFDDRg8bGiYDHdsG70Z-AQ&s",
    description: "The Naam Tamilar Katchi (NTK) is a Tamil nationalist party founded by filmmaker Seeman in 2009. The party advocates for Tamil sovereignty, linguistic pride, and social justice. NTK has gained attention for its strong anti-establishment stance and its focus on issues like unemployment, education, and healthcare. Though the party has yet to win significant electoral victories, it has a growing base of support among youth and Tamil nationalists."
  },
  {
    id: "dmdk",
    name: "Desiya Murpokku Dravida Kazhagam (DMDK)",
    leader: "Premalatha Vijayakanth",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Indian_Election_Symbol_Nagara.svg/1200px-Indian_Election_Symbol_Nagara.svg.png",
    description: "The Desiya Murpokku Dravida Kazhagam (DMDK) was founded by actor-politician Captain Vijayakanth in 2005. The party initially gained popularity as an alternative to the DMK and AIADMK but has faced challenges in recent years. After Vijayakanth's health issues, his wife, Premalatha Vijayakanth, has taken over the party's leadership. DMDK focuses on anti-corruption, social justice, and welfare schemes but has struggled to maintain its electoral relevance."
  },
  {
    id: "mnm",
    name: "Makkal Needhi Maiam (MNM)",
    leader: "Kamal Haasan",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-MsEUQNTurV2bYViujZVApPftPTstvGeFA&s",
    description: "Makkal Needhi Maiam (MNM) is a political party founded by renowned actor Kamal Haasan in 2018. The party positions itself as a centrist, reformist alternative to traditional Dravidian parties. MNM focuses on issues like corruption, governance, education, and healthcare. Though the party has yet to achieve significant electoral success, Kamal Haasan's popularity and the party's emphasis on transparency and accountability have attracted a niche following."
  },
  {
    id: "pt",
    name: "Puthiya Tamilagam",
    leader: "Dr. K. Krishnasamy",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Puthiya_Tamilagam_Party_Flag.jpg",
    description: "Puthiya Tamilagam is a political party founded by Dr. K. Krishnasamy in 1996, primarily representing the Pallar community, a sub-caste of Dalits. The party advocates for social justice, reservation policies, and the rights of marginalized communities. Puthiya Tamilagam has often aligned with larger parties like the DMK and AIADMK to secure electoral gains. The party's influence is concentrated in southern Tamil Nadu."
  }
];
