let defaultNumVotes = 1;
db.queues.insertMany([
  {
    "channel": "Electronic",
    "queue": [
      {
        "songName": "Lose Somebody",
        "artists": ["Kygo", "OneRepublic"],
        "numVotes": defaultNumVotes,
        "src": "https://www.youtube.com/watch?v=TmWih4XfRWY",
        "requesterId": "5ef2b315ed4d61192f51f005"
      }
    ]
  },
  {
    "channel": "Rock",
    "queue": [
      {
        "songName": "You Can't Always Get What You Want",
        "artists": ["The Rolling Stones"],
        "numVotes": defaultNumVotes,
        "src": "https://www.youtube.com/watch?v=Ef9QnZVpVd8",
        "requesterId": "5ef2b315ed4d61192f51f005"
      }
    ]
  },
  {
    "channel": "Lo-fi",
    "queue": [
      {
        "songName": "Get You The Moon",
        "artists": ["Kina", "Snow"],
        "numVotes": defaultNumVotes,
        "src": "https://www.youtube.com/watch?v=WTsmIbNku5g&list=PLOzDu-MXXLliO9fBNZOQTBDddoA3FzZUo&index=1",
        "requesterId": "5ef2b315ed4d61192f51f005"
      }
    ]
  },
  {
    "channel": "Reggae",
    "queue": [
      {
        "songName": "Who Knows",
        "artists": ["Protoje"],
        "numVotes": defaultNumVotes,
        "src": "https://www.youtube.com/watch?v=hzqFmXZ8tOE",
        "requesterId": "5ef2b315ed4d61192f51f005"
      }
    ]
  },
  {
    "channel": "Jazz",
    "queue": [
      {
        "songName": "The Sky is Crying",
        "artists": ["Gary B.B. Coleman"],
        "numVotes": defaultNumVotes,
        "src": "https://www.youtube.com/watch?v=71Gt46aX9Z4",
        "requesterId": "5ef2b315ed4d61192f51f005"
      }
    ]
  },
  {
    "channel": "Classical",
    "queue": [
      {
        "songName": "Clair de Lune",
        "artists": ["Claude Debussy"],
        "numVotes": defaultNumVotes,
        "src": "https://www.youtube.com/watch?v=CvFH_6DNRCY",
        "requesterId": "5ef2b315ed4d61192f51f005"
      }
    ]
  },
  {
    "channel": "Country",
    "queue": [
      {
        "songName": "Jolene",
        "artists": ["Dolly Parton"],
        "numVotes": defaultNumVotes,
        "src": "https://www.youtube.com/watch?v=Ixrje2rXLMA",
        "requesterId": "5ef2b315ed4d61192f51f005"
      }
    ]
  },
  {
    "channel": "Hip-Hop",
    "queue": [
      {
        "songName": "Fancy",
        "artists": ["Iggy Azalea"],
        "numVotes": defaultNumVotes,
        "src": "https://www.youtube.com/watch?v=O-zpOMYRi0w",
        "requesterId": "5ef2b315ed4d61192f51f005"
      }
    ]
  },
  {
    "channel": "Rap",
    "queue": [
      {
        "songName": "Money",
        "artists": ["Cardi B"],
        "numVotes": defaultNumVotes,
        "src": "https://www.youtube.com/watch?v=Zj2cK8wymIA",
        "requesterId": "5ef2b315ed4d61192f51f005"
      }
    ]
  },
])
