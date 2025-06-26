// Quiz data structure with multiple categories
export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  icon: string
  color: string
  questions: Question[]
  timeLimit: number // in seconds
}

export const quizCategories: Quiz[] = [
  {
    id: "general-knowledge",
    title: "General Knowledge",
    description: "Test your knowledge across various topics!",
    icon: "🧠",
    color: "from-blue-500 to-indigo-600",
    timeLimit: 300,
    questions: [
      {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        explanation: "Paris is the capital and most populous city of France.",
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation: "Mars is called the Red Planet due to its reddish appearance caused by iron oxide on its surface.",
      },
      {
        id: 3,
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1,
        explanation: "The Blue Whale is the largest animal ever known to have lived on Earth.",
      },
      {
        id: 4,
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correctAnswer: 1,
        explanation: "World War II ended in 1945 with the surrender of Japan in September.",
      },
      {
        id: 5,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation: "Au comes from the Latin word 'aurum' meaning gold.",
      },
      {
        id: 6,
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
        correctAnswer: 2,
        explanation: "Vatican City is the smallest sovereign state in the world by both area and population.",
      },
      {
        id: 7,
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
        explanation: "The Mona Lisa was painted by Leonardo da Vinci between 1503 and 1519.",
      },
      {
        id: 8,
        question: "What is the fastest land animal?",
        options: ["Lion", "Cheetah", "Leopard", "Gazelle"],
        correctAnswer: 1,
        explanation: "The cheetah can reach speeds of up to 70 mph, making it the fastest land animal.",
      },
    ],
  },
  {
    id: "science",
    title: "Science & Nature",
    description: "Explore the wonders of science and nature!",
    icon: "🔬",
    color: "from-green-500 to-emerald-600",
    timeLimit: 360,
    questions: [
      {
        id: 1,
        question: "What is the chemical formula for water?",
        options: ["H2O", "CO2", "NaCl", "CH4"],
        correctAnswer: 0,
        explanation: "Water is composed of two hydrogen atoms and one oxygen atom, hence H2O.",
      },
      {
        id: 2,
        question: "Which element has the atomic number 6?",
        options: ["Oxygen", "Nitrogen", "Carbon", "Boron"],
        correctAnswer: 2,
        explanation: "Carbon has 6 protons in its nucleus, giving it the atomic number 6.",
      },
      {
        id: 3,
        question: "What is the speed of light in vacuum?",
        options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
        correctAnswer: 0,
        explanation:
          "The speed of light in vacuum is approximately 299,792,458 meters per second or about 300,000 km/s.",
      },
      {
        id: 4,
        question: "Which organ produces insulin in the human body?",
        options: ["Liver", "Kidney", "Pancreas", "Heart"],
        correctAnswer: 2,
        explanation: "The pancreas produces insulin, which regulates blood sugar levels.",
      },
      {
        id: 5,
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Quartz"],
        correctAnswer: 2,
        explanation: "Diamond is the hardest naturally occurring substance, rating 10 on the Mohs scale.",
      },
      {
        id: 6,
        question: "How many chambers does a human heart have?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
        explanation: "The human heart has four chambers: two atria and two ventricles.",
      },
      {
        id: 7,
        question: "What gas do plants absorb from the atmosphere during photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: 2,
        explanation: "Plants absorb carbon dioxide from the atmosphere and convert it to oxygen during photosynthesis.",
      },
      {
        id: 8,
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Earth", "Mars"],
        correctAnswer: 1,
        explanation: "Mercury is the closest planet to the Sun in our solar system.",
      },
    ],
  },
  {
    id: "technology",
    title: "Technology & Programming",
    description: "Test your tech knowledge and programming skills!",
    icon: "💻",
    color: "from-purple-500 to-violet-600",
    timeLimit: 420,
    questions: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlink and Text Markup Language",
        ],
        correctAnswer: 0,
        explanation: "HTML stands for HyperText Markup Language, the standard markup language for web pages.",
      },
      {
        id: 2,
        question: "Which programming language was created by Guido van Rossum?",
        options: ["Java", "Python", "C++", "JavaScript"],
        correctAnswer: 1,
        explanation: "Python was created by Guido van Rossum and first released in 1991.",
      },
      {
        id: 3,
        question: "What does CPU stand for?",
        options: [
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Program Unit",
          "Computer Processing Unit",
        ],
        correctAnswer: 0,
        explanation:
          "CPU stands for Central Processing Unit, the main component that executes instructions in a computer.",
      },
      {
        id: 4,
        question: "Which company developed the React JavaScript library?",
        options: ["Google", "Microsoft", "Facebook", "Apple"],
        correctAnswer: 2,
        explanation: "React was developed by Facebook (now Meta) and is maintained by Meta and the community.",
      },
      {
        id: 5,
        question: "What does API stand for?",
        options: [
          "Application Programming Interface",
          "Advanced Programming Interface",
          "Application Program Integration",
          "Advanced Program Integration",
        ],
        correctAnswer: 0,
        explanation:
          "API stands for Application Programming Interface, a set of protocols for building software applications.",
      },
      {
        id: 6,
        question: "Which of these is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        correctAnswer: 2,
        explanation: "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.",
      },
      {
        id: 7,
        question: "What does Git primarily help with?",
        options: ["Database management", "Version control", "Web hosting", "Image editing"],
        correctAnswer: 1,
        explanation:
          "Git is a distributed version control system for tracking changes in source code during software development.",
      },
      {
        id: 8,
        question: "Which HTTP status code indicates 'Not Found'?",
        options: ["200", "404", "500", "301"],
        correctAnswer: 1,
        explanation: "HTTP status code 404 indicates that the requested resource could not be found on the server.",
      },
    ],
  },
  {
    id: "history",
    title: "World History",
    description: "Journey through time and test your historical knowledge!",
    icon: "🏛️",
    color: "from-amber-500 to-orange-600",
    timeLimit: 300,
    questions: [
      {
        id: 1,
        question: "In which year did the Berlin Wall fall?",
        options: ["1987", "1989", "1991", "1993"],
        correctAnswer: 1,
        explanation: "The Berlin Wall fell on November 9, 1989, marking a pivotal moment in the end of the Cold War.",
      },
      {
        id: 2,
        question: "Who was the first person to walk on the moon?",
        options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
        correctAnswer: 1,
        explanation:
          "Neil Armstrong was the first person to walk on the moon on July 20, 1969, during the Apollo 11 mission.",
      },
      {
        id: 3,
        question: "Which ancient wonder of the world was located in Alexandria?",
        options: ["Hanging Gardens", "Colossus of Rhodes", "Lighthouse of Alexandria", "Temple of Artemis"],
        correctAnswer: 2,
        explanation:
          "The Lighthouse of Alexandria (Pharos of Alexandria) was one of the Seven Wonders of the Ancient World.",
      },
      {
        id: 4,
        question: "The Renaissance period began in which country?",
        options: ["France", "Germany", "Italy", "England"],
        correctAnswer: 2,
        explanation: "The Renaissance began in Italy in the 14th century, particularly in Florence.",
      },
      {
        id: 5,
        question: "Who wrote 'The Communist Manifesto'?",
        options: ["Vladimir Lenin", "Karl Marx and Friedrich Engels", "Joseph Stalin", "Leon Trotsky"],
        correctAnswer: 1,
        explanation: "The Communist Manifesto was written by Karl Marx and Friedrich Engels in 1848.",
      },
      {
        id: 6,
        question: "Which empire was ruled by Julius Caesar?",
        options: ["Greek Empire", "Roman Empire", "Byzantine Empire", "Persian Empire"],
        correctAnswer: 1,
        explanation: "Julius Caesar was a Roman general and statesman who played a critical role in the Roman Empire.",
      },
      {
        id: 7,
        question: "The Magna Carta was signed in which year?",
        options: ["1215", "1066", "1348", "1485"],
        correctAnswer: 0,
        explanation: "The Magna Carta was signed in 1215, limiting the power of the English king.",
      },
      {
        id: 8,
        question: "Which war was fought between 1914-1918?",
        options: ["World War II", "World War I", "American Civil War", "Napoleonic Wars"],
        correctAnswer: 1,
        explanation: "World War I was fought from 1914 to 1918, also known as the Great War.",
      },
    ],
  },
  {
    id: "sports",
    title: "Sports & Games",
    description: "Test your knowledge of sports and games from around the world!",
    icon: "⚽",
    color: "from-red-500 to-pink-600",
    timeLimit: 240,
    questions: [
      {
        id: 1,
        question: "How many players are on a basketball team on the court at one time?",
        options: ["4", "5", "6", "7"],
        correctAnswer: 1,
        explanation: "Each basketball team has 5 players on the court at any given time.",
      },
      {
        id: 2,
        question: "In which sport would you perform a slam dunk?",
        options: ["Volleyball", "Tennis", "Basketball", "Baseball"],
        correctAnswer: 2,
        explanation:
          "A slam dunk is a basketball shot where a player jumps and scores by putting the ball directly through the hoop.",
      },
      {
        id: 3,
        question: "How often are the Summer Olympic Games held?",
        options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],
        correctAnswer: 2,
        explanation: "The Summer Olympic Games are held every four years.",
      },
      {
        id: 4,
        question: "In golf, what is the term for one stroke under par?",
        options: ["Eagle", "Birdie", "Bogey", "Albatross"],
        correctAnswer: 1,
        explanation: "A birdie in golf means scoring one stroke under par for a hole.",
      },
      {
        id: 5,
        question: "Which country has won the most FIFA World Cups?",
        options: ["Germany", "Argentina", "Brazil", "Italy"],
        correctAnswer: 2,
        explanation: "Brazil has won the FIFA World Cup 5 times, more than any other country.",
      },
      {
        id: 6,
        question: "In tennis, what score comes after deuce?",
        options: ["Game", "Match", "Advantage", "Set"],
        correctAnswer: 2,
        explanation: "After deuce in tennis, the next point gives a player 'advantage'.",
      },
      {
        id: 7,
        question: "How many rings are there in the Olympic symbol?",
        options: ["4", "5", "6", "7"],
        correctAnswer: 1,
        explanation: "The Olympic symbol consists of five interlocking rings representing the five continents.",
      },
      {
        id: 8,
        question: "In American football, how many points is a touchdown worth?",
        options: ["3", "6", "7", "8"],
        correctAnswer: 1,
        explanation: "A touchdown in American football is worth 6 points.",
      },
    ],
  },
  {
    id: "geography",
    title: "World Geography",
    description: "Explore countries, capitals, and landmarks around the globe!",
    icon: "🌍",
    color: "from-teal-500 to-cyan-600",
    timeLimit: 300,
    questions: [
      {
        id: 1,
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correctAnswer: 2,
        explanation: "Canberra is the capital city of Australia, not Sydney or Melbourne as commonly thought.",
      },
      {
        id: 2,
        question: "Which is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
        correctAnswer: 1,
        explanation: "The Nile River is generally considered the longest river in the world at about 6,650 km.",
      },
      {
        id: 3,
        question: "Mount Everest is located in which mountain range?",
        options: ["Andes", "Rocky Mountains", "Alps", "Himalayas"],
        correctAnswer: 3,
        explanation: "Mount Everest is located in the Himalayas on the border between Nepal and Tibet.",
      },
      {
        id: 4,
        question: "Which desert is the largest in the world?",
        options: ["Sahara Desert", "Gobi Desert", "Antarctic Desert", "Arabian Desert"],
        correctAnswer: 2,
        explanation: "Antarctica is technically the largest desert in the world, being a cold desert.",
      },
      {
        id: 5,
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
        explanation:
          "There are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia/Oceania.",
      },
      {
        id: 6,
        question: "Which country has the most time zones?",
        options: ["Russia", "United States", "China", "Canada"],
        correctAnswer: 0,
        explanation: "Russia spans 11 time zones, more than any other country.",
      },
      {
        id: 7,
        question: "The Great Barrier Reef is located off the coast of which country?",
        options: ["Brazil", "Australia", "Philippines", "Indonesia"],
        correctAnswer: 1,
        explanation: "The Great Barrier Reef is located off the northeastern coast of Australia.",
      },
      {
        id: 8,
        question: "Which African country is completely surrounded by South Africa?",
        options: ["Swaziland", "Lesotho", "Botswana", "Namibia"],
        correctAnswer: 1,
        explanation: "Lesotho is completely surrounded by South Africa, making it an enclave.",
      },
    ],
  },
]
