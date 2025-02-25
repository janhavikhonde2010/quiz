import React, { useState } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';

const defaultQuestions = {
  Science: [
    { question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Pb', 'Fe'], answer: 'Au', reference: 'https://en.wikipedia.org/wiki/Gold' },
    { question: 'What planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], answer: 'Mars', reference: 'https://en.wikipedia.org/wiki/Mars' },
    { question: 'What gas do plants absorb?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], answer: 'Carbon dioxide', reference: 'https://en.wikipedia.org/wiki/Photosynthesis' },
    { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi'], answer: 'Mitochondria', reference: 'https://en.wikipedia.org/wiki/Mitochondrion' },
    { question: 'What is the hardest natural substance?', options: ['Gold', 'Iron', 'Diamond', 'Graphite'], answer: 'Diamond', reference: 'https://en.wikipedia.org/wiki/Diamond' },
    { question: 'What type of energy comes from the sun?', options: ['Nuclear', 'Thermal', 'Solar', 'Wind'], answer: 'Solar', reference: 'https://en.wikipedia.org/wiki/Solar_energy' },
    { question: 'What is H2O known as?', options: ['Salt', 'Water', 'Hydrogen', 'Oxygen'], answer: 'Water', reference: 'https://en.wikipedia.org/wiki/Water' },
    { question: 'Which organ pumps blood?', options: ['Lungs', 'Heart', 'Brain', 'Liver'], answer: 'Heart', reference: 'https://en.wikipedia.org/wiki/Heart' },
    { question: 'How many bones are in the adult human body?', options: ['206', '208', '210', '215'], answer: '206', reference: 'https://en.wikipedia.org/wiki/Human_skeleton' },
    { question: 'What is the speed of light?', options: ['300,000 km/s', '150,000 km/s', '100,000 km/s', '1,000,000 km/s'], answer: '300,000 km/s', reference: 'https://en.wikipedia.org/wiki/Speed_of_light' },
  ],
  Math: [
    { question: 'What is 5 + 7?', options: ['10', '12', '14', '15'], answer: '12', reference: 'https://en.wikipedia.org/wiki/Addition' },
    { question: 'What is the square root of 64?', options: ['6', '7', '8', '9'], answer: '8', reference: 'https://en.wikipedia.org/wiki/Square_root' },
    { question: 'What is the value of π (pi) rounded to two decimal places?', options: ['3.12', '3.14', '3.16', '3.18'], answer: '3.14', reference: 'https://en.wikipedia.org/wiki/Pi' },
    { question: 'What is 12 x 8?', options: ['90', '96', '100', '104'], answer: '96', reference: 'https://en.wikipedia.org/wiki/Multiplication' },
    { question: 'What is 100 ÷ 4?', options: ['20', '25', '30', '40'], answer: '25', reference: 'https://en.wikipedia.org/wiki/Division_(mathematics)' },
    { question: 'What is the perimeter of a square with side 5?', options: ['10', '15', '20', '25'], answer: '20', reference: 'https://en.wikipedia.org/wiki/Perimeter' },
    { question: 'What is 7²?', options: ['42', '49', '56', '64'], answer: '49', reference: 'https://en.wikipedia.org/wiki/Exponentiation' },
    { question: 'What is the area of a triangle with base 6 and height 4?', options: ['10', '12', '15', '20'], answer: '12', reference: 'https://en.wikipedia.org/wiki/Area_of_a_triangle' },
    { question: 'What is 3! (3 factorial)?', options: ['3', '6', '9', '12'], answer: '6', reference: 'https://en.wikipedia.org/wiki/Factorial' },
    { question: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], answer: '180°', reference: 'https://en.wikipedia.org/wiki/Triangle' },
  ],

  
    History: [
      { question: 'Who was the first President of the USA?', options: ['Abraham Lincoln', 'George Washington', 'John Adams', 'Thomas Jefferson'], answer: 'George Washington', reference: 'https://en.wikipedia.org/wiki/George_Washington' },
      { question: 'In which year did World War II end?', options: ['1943', '1945', '1947', '1950'], answer: '1945', reference: 'https://en.wikipedia.org/wiki/World_War_II' },
      { question: 'Which civilization built the pyramids?', options: ['Greek', 'Egyptian', 'Roman', 'Mayan'], answer: 'Egyptian', reference: 'https://en.wikipedia.org/wiki/Egyptian_pyramids' },
      { question: 'Who discovered America?', options: ['Vasco da Gama', 'Christopher Columbus', 'James Cook', 'Ferdinand Magellan'], answer: 'Christopher Columbus', reference: 'https://en.wikipedia.org/wiki/Christopher_Columbus' },
      { question: 'Which war was fought between the North and South regions of the USA?', options: ['Revolutionary War', 'Civil War', 'Cold War', 'World War I'], answer: 'Civil War', reference: 'https://en.wikipedia.org/wiki/American_Civil_War' },
      { question: 'Who was the first Emperor of China?', options: ['Kublai Khan', 'Qin Shi Huang', 'Sun Yat-sen', 'Confucius'], answer: 'Qin Shi Huang', reference: 'https://en.wikipedia.org/wiki/Qin_Shi_Huang' },
      { question: 'Which empire was ruled by Julius Caesar?', options: ['Greek Empire', 'Roman Empire', 'Persian Empire', 'Byzantine Empire'], answer: 'Roman Empire', reference: 'https://en.wikipedia.org/wiki/Julius_Caesar' },
      { question: 'When did India gain independence?', options: ['1945', '1947', '1950', '1965'], answer: '1947', reference: 'https://en.wikipedia.org/wiki/Independence_Day_(India)' },
      { question: 'Who was known as the "Iron Lady"?', options: ['Margaret Thatcher', 'Indira Gandhi', 'Angela Merkel', 'Hillary Clinton'], answer: 'Margaret Thatcher', reference: 'https://en.wikipedia.org/wiki/Margaret_Thatcher' },
      { question: 'Which ancient city was buried under volcanic ash in AD 79?', options: ['Athens', 'Pompeii', 'Carthage', 'Babylon'], answer: 'Pompeii', reference: 'https://en.wikipedia.org/wiki/Pompeii' },
    ],
  
    Geography: [
      { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'], answer: 'Paris', reference: 'https://en.wikipedia.org/wiki/Paris' },
      { question: 'Which is the largest ocean?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 'Pacific', reference: 'https://en.wikipedia.org/wiki/Pacific_Ocean' },
      { question: 'Which desert is the largest in the world?', options: ['Sahara', 'Gobi', 'Kalahari', 'Atacama'], answer: 'Sahara', reference: 'https://en.wikipedia.org/wiki/Sahara' },
      { question: 'Mount Everest is located in which country?', options: ['India', 'Nepal', 'China', 'Pakistan'], answer: 'Nepal', reference: 'https://en.wikipedia.org/wiki/Mount_Everest' },
      { question: 'Which river is the longest in the world?', options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'], answer: 'Nile', reference: 'https://en.wikipedia.org/wiki/Nile' },
      { question: 'Which country has the most population?', options: ['USA', 'India', 'China', 'Brazil'], answer: 'China', reference: 'https://en.wikipedia.org/wiki/China' },
      { question: 'What is the smallest country in the world?', options: ['Monaco', 'Malta', 'Vatican City', 'Liechtenstein'], answer: 'Vatican City', reference: 'https://en.wikipedia.org/wiki/Vatican_City' },
      { question: 'Which continent is the largest by area?', options: ['Africa', 'Asia', 'Europe', 'North America'], answer: 'Asia', reference: 'https://en.wikipedia.org/wiki/Asia' },
      { question: 'What is the capital of Japan?', options: ['Seoul', 'Beijing', 'Bangkok', 'Tokyo'], answer: 'Tokyo', reference: 'https://en.wikipedia.org/wiki/Tokyo' },
      { question: 'Which US state has the longest coastline?', options: ['California', 'Florida', 'Alaska', 'Texas'], answer: 'Alaska', reference: 'https://en.wikipedia.org/wiki/Alaska' },
    ],
  
    Technology: [
      { question: 'Who is the founder of Microsoft?', options: ['Steve Jobs', 'Bill Gates', 'Elon Musk', 'Mark Zuckerberg'], answer: 'Bill Gates', reference: 'https://en.wikipedia.org/wiki/Bill_Gates' },
      { question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Central Processor Unit'], answer: 'Central Processing Unit', reference: 'https://en.wikipedia.org/wiki/Central_processing_unit' },
      { question: 'Which programming language is used for web development?', options: ['Python', 'Java', 'JavaScript', 'C++'], answer: 'JavaScript', reference: 'https://en.wikipedia.org/wiki/JavaScript' },
      { question: 'What does HTTP stand for?', options: ['HyperText Transfer Protocol', 'HyperText Transport Protocol', 'High Tech Transfer Process', 'Hyper Transfer Technology Protocol'], answer: 'HyperText Transfer Protocol', reference: 'https://en.wikipedia.org/wiki/HTTP' },
      { question: 'Which company developed the iPhone?', options: ['Samsung', 'Apple', 'Google', 'Microsoft'], answer: 'Apple', reference: 'https://en.wikipedia.org/wiki/IPhone' },
      { question: 'What does AI stand for?', options: ['Automated Intelligence', 'Artificial Intelligence', 'Advanced Internet', 'Automated Information'], answer: 'Artificial Intelligence', reference: 'https://en.wikipedia.org/wiki/Artificial_intelligence' },
      { question: 'Which search engine is owned by Google?', options: ['Yahoo', 'Bing', 'DuckDuckGo', 'Google'], answer: 'Google', reference: 'https://en.wikipedia.org/wiki/Google_Search' },
      { question: 'What is the name of Elon Musk’s space company?', options: ['Blue Origin', 'NASA', 'SpaceX', 'Virgin Galactic'], answer: 'SpaceX', reference: 'https://en.wikipedia.org/wiki/SpaceX' },
      { question: 'Which social media platform is owned by Meta?', options: ['Twitter', 'LinkedIn', 'Instagram', 'Snapchat'], answer: 'Instagram', reference: 'https://en.wikipedia.org/wiki/Instagram' },
      { question: 'Which device is used to store digital data?', options: ['Printer', 'Scanner', 'Hard Drive', 'Monitor'], answer: 'Hard Drive', reference: 'https://en.wikipedia.org/wiki/Hard_disk_drive' },
    ],      
        Sports: [
          { question: 'Which country won the FIFA World Cup in 2018?', options: ['Brazil', 'France', 'Germany', 'Argentina'], answer: 'France', reference: 'https://en.wikipedia.org/wiki/2018_FIFA_World_Cup' },
          { question: 'How many players are there in a standard soccer team?', options: ['9', '10', '11', '12'], answer: '11', reference: 'https://en.wikipedia.org/wiki/Association_football' },
          { question: 'Which sport is known as the "king of sports"?', options: ['Cricket', 'Basketball', 'Football (Soccer)', 'Tennis'], answer: 'Football (Soccer)', reference: 'https://en.wikipedia.org/wiki/Football' },
          { question: 'Who has won the most Grand Slam tennis titles?', options: ['Roger Federer', 'Rafael Nadal', 'Novak Djokovic', 'Serena Williams'], answer: 'Novak Djokovic', reference: 'https://en.wikipedia.org/wiki/Grand_Slam_(tennis)' },
          { question: 'Which country hosts the Olympic Games in 2024?', options: ['USA', 'China', 'France', 'Japan'], answer: 'France', reference: 'https://en.wikipedia.org/wiki/2024_Summer_Olympics' },
          { question: 'Who holds the record for the fastest 100m sprint?', options: ['Usain Bolt', 'Carl Lewis', 'Yohan Blake', 'Tyson Gay'], answer: 'Usain Bolt', reference: 'https://en.wikipedia.org/wiki/Usain_Bolt' },
          { question: 'Which basketball league is the most popular worldwide?', options: ['NBA', 'EuroLeague', 'FIBA', 'WNBA'], answer: 'NBA', reference: 'https://en.wikipedia.org/wiki/National_Basketball_Association' },
          { question: 'Which country has won the most Cricket World Cups?', options: ['India', 'Australia', 'England', 'Pakistan'], answer: 'Australia', reference: 'https://en.wikipedia.org/wiki/Cricket_World_Cup' },
          { question: 'What is the national sport of Canada?', options: ['Hockey', 'Baseball', 'Lacrosse', 'Basketball'], answer: 'Lacrosse', reference: 'https://en.wikipedia.org/wiki/Sport_in_Canada' },
          { question: 'Which city hosted the first modern Olympic Games?', options: ['London', 'Athens', 'Paris', 'Berlin'], answer: 'Athens', reference: 'https://en.wikipedia.org/wiki/1896_Summer_Olympics' },
        ],
      
        Entertainment: [
          { question: 'Which movie won the Best Picture Oscar in 2023?', options: ['Avatar 2', 'Everything Everywhere All at Once', 'Top Gun: Maverick', 'The Fabelmans'], answer: 'Everything Everywhere All at Once', reference: 'https://en.wikipedia.org/wiki/95th_Academy_Awards' },
          { question: 'Who played Iron Man in the Marvel movies?', options: ['Chris Evans', 'Robert Downey Jr.', 'Mark Ruffalo', 'Chris Hemsworth'], answer: 'Robert Downey Jr.', reference: 'https://en.wikipedia.org/wiki/Robert_Downey_Jr.' },
          { question: 'Which TV show features the character Walter White?', options: ['Breaking Bad', 'Better Call Saul', 'House of Cards', 'Suits'], answer: 'Breaking Bad', reference: 'https://en.wikipedia.org/wiki/Breaking_Bad' },
          { question: 'Which singer is known as the "Queen of Pop"?', options: ['Madonna', 'Beyoncé', 'Ariana Grande', 'Lady Gaga'], answer: 'Madonna', reference: 'https://en.wikipedia.org/wiki/Madonna' },
          { question: 'Which animated movie features a snowman named Olaf?', options: ['Moana', 'Frozen', 'Tangled', 'Encanto'], answer: 'Frozen', reference: 'https://en.wikipedia.org/wiki/Frozen_(2013_film)' },
          { question: 'Which video game series features the character Mario?', options: ['Sonic the Hedgehog', 'Zelda', 'Super Mario', 'Pac-Man'], answer: 'Super Mario', reference: 'https://en.wikipedia.org/wiki/Mario' },
          { question: 'What is the longest-running animated TV series?', options: ['The Simpsons', 'South Park', 'Family Guy', 'Looney Tunes'], answer: 'The Simpsons', reference: 'https://en.wikipedia.org/wiki/The_Simpsons' },
          { question: 'Who directed the movie "Inception"?', options: ['Steven Spielberg', 'Christopher Nolan', 'James Cameron', 'Quentin Tarantino'], answer: 'Christopher Nolan', reference: 'https://en.wikipedia.org/wiki/Inception' },
          { question: 'Which artist released the album "Thriller"?', options: ['Michael Jackson', 'Elton John', 'Prince', 'The Beatles'], answer: 'Michael Jackson', reference: 'https://en.wikipedia.org/wiki/Thriller_(album)' },
          { question: 'What is the name of the wizarding school in Harry Potter?', options: ['Hogwarts', 'Beauxbatons', 'Ilvermorny', 'Durmstrang'], answer: 'Hogwarts', reference: 'https://en.wikipedia.org/wiki/Hogwarts' },
        ],
         Politics :[
            { question: 'Who is the current President of the USA (2024)?', options: ['Donald Trump', 'Joe Biden', 'Barack Obama', 'George Bush'], answer: 'Joe Biden', reference: 'https://en.wikipedia.org/wiki/Joe_Biden' },
            { question: 'Which document starts with "We the People"?', options: ['Declaration of Independence', 'US Constitution', 'Bill of Rights', 'Magna Carta'], answer: 'US Constitution', reference: 'https://en.wikipedia.org/wiki/United_States_Constitution' },
            { question: 'What is the capital of the European Union?', options: ['Berlin', 'Brussels', 'Paris', 'Madrid'], answer: 'Brussels', reference: 'https://en.wikipedia.org/wiki/Brussels' },
            { question: 'Which country has the largest democracy?', options: ['USA', 'India', 'China', 'Brazil'], answer: 'India', reference: 'https://en.wikipedia.org/wiki/Democracy_in_India' },
            { question: 'Who was the first female Prime Minister of the UK?', options: ['Margaret Thatcher', 'Theresa May', 'Angela Merkel', 'Indira Gandhi'], answer: 'Margaret Thatcher', reference: 'https://en.wikipedia.org/wiki/Margaret_Thatcher' },
            { question: 'Which U.S. state has the most electoral votes?', options: ['Texas', 'California', 'Florida', 'New York'], answer: 'California', reference: 'https://en.wikipedia.org/wiki/Electoral_College_(United_States)' },
            { question: 'Who was the first President of the United States?', options: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams'], answer: 'George Washington', reference: 'https://en.wikipedia.org/wiki/George_Washington' },
            { question: 'What is the primary legislative body of the United Kingdom?', options: ['House of Representatives', 'House of Lords', 'House of Commons', 'Parliament'], answer: 'Parliament', reference: 'https://en.wikipedia.org/wiki/Parliament_of_the_United_Kingdom' },
            { question: 'Which country was the first to grant women the right to vote?', options: ['USA', 'UK', 'New Zealand', 'Canada'], answer: 'New Zealand', reference: 'https://en.wikipedia.org/wiki/Women%27s_suffrage_in_New_Zealand' },
            { question: 'What is the main role of the United Nations?', options: ['Economic Growth', 'Global Security and Peacekeeping', 'Space Exploration', 'International Banking'], answer: 'Global Security and Peacekeeping', reference: 'https://en.wikipedia.org/wiki/United_Nations' },
          ],
          Art:[
            { question: 'Who painted the Mona Lisa?', options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'], answer: 'Leonardo da Vinci', reference: 'https://en.wikipedia.org/wiki/Mona_Lisa' },
            { question: 'Which famous artist cut off his own ear?', options: ['Pablo Picasso', 'Salvador Dalí', 'Vincent van Gogh', 'Claude Monet'], answer: 'Vincent van Gogh', reference: 'https://en.wikipedia.org/wiki/Vincent_van_Gogh' },
            { question: 'The Starry Night was painted by which artist?', options: ['Claude Monet', 'Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso'], answer: 'Vincent van Gogh', reference: 'https://en.wikipedia.org/wiki/The_Starry_Night' },
            { question: 'Which artistic movement is Salvador Dalí associated with?', options: ['Surrealism', 'Cubism', 'Impressionism', 'Abstract Art'], answer: 'Surrealism', reference: 'https://en.wikipedia.org/wiki/Surrealism' },
            { question: 'Which country is famous for creating origami?', options: ['China', 'Japan', 'South Korea', 'Thailand'], answer: 'Japan', reference: 'https://en.wikipedia.org/wiki/Origami' },
            { question: 'Which artist is known for painting the ceiling of the Sistine Chapel?', options: ['Leonardo da Vinci', 'Raphael', 'Michelangelo', 'Donatello'], answer: 'Michelangelo', reference: 'https://en.wikipedia.org/wiki/Sistine_Chapel_ceiling' },
            { question: 'Which painting is also called "La Gioconda"?', options: ['The Starry Night', 'The Scream', 'The Mona Lisa', 'The Girl with a Pearl Earring'], answer: 'The Mona Lisa', reference: 'https://en.wikipedia.org/wiki/Mona_Lisa' },
            { question: 'Which artist was famous for his Blue and Rose periods?', options: ['Claude Monet', 'Vincent van Gogh', 'Pablo Picasso', 'Jackson Pollock'], answer: 'Pablo Picasso', reference: 'https://en.wikipedia.org/wiki/Picasso%27s_Blue_Period' },
            { question: 'What is the name of the art museum in Paris that houses the Mona Lisa?', options: ['The Louvre', 'The British Museum', 'The Vatican Museums', 'The Met'], answer: 'The Louvre', reference: 'https://en.wikipedia.org/wiki/Louvre' },
            { question: 'Which type of painting technique uses wet plaster?', options: ['Watercolor', 'Fresco', 'Oil Painting', 'Acrylic'], answer: 'Fresco', reference: 'https://en.wikipedia.org/wiki/Fresco' },
          ],
          
      
          
          

};

const Quiz = () => {
  const { category } = useParams();
  const questions = defaultQuestions[category] || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <div style={styles.completed}>
        <h2>Quiz Completed!</h2>
        <p>Your Score: {score} / {questions.length}</p>
      </div>
    );
  }

  return (
    <div style={styles.quizContainer}>
      <h2 style={styles.quizTitle}>{category} Quiz</h2>
      <form style={styles.quizForm}>
        <h3 style={styles.question}>{questions[currentQuestionIndex].question}</h3>
        <div style={styles.options}>
          {questions[currentQuestionIndex].options.map((option) => (
            <label key={option} style={styles.optionLabel}>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => setSelectedAnswer(option)}
                style={styles.optionInput}
              />
              {option}
            </label>
          ))}
        </div>
        <button type="button" onClick={handleNext} style={styles.nextButton}>Next</button>
      </form>
    </div>
  );
};

const styles = {
  quizContainer: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
  },
  quizTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#333',
  },
  quizForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  question: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#444',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  optionLabel: {
    fontSize: '1rem',
    color: '#555',
    cursor: 'pointer',
  },
  optionInput: {
    marginRight: '10px',
  },
  nextButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  completed: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#e0f7fa',
    borderRadius: '8px',
    marginTop: '20px',
  }
};

export default Quiz;
