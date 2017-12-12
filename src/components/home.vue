<template>
  <div>
    <div class="jheader">
      <div class="scrollToggle text-left">
        <button @click="scroll(isScrolling); isScrolling = !isScrolling" class="scroll-toggle btn btn-sm btn-outline-primary">Turn On Scroll</button>
      </div>
      <div class="text-center">
        <h1>PEOPLE OF BCOE</h1>
      </div>
      <div class="signinlink text-right">
        <a href="http://acmucr.org/">Made with <span style="color:red;">❤️</span> by ACM</a>
      </div>
    </div>

    <b-container class="h-100 mt-5">
      <b-card-group columns>
          <div class="jcard card" v-for="p in people" :key="p.name">
            <div class="img-container">
              <img class="card-img-top" v-lazy="`static/people/${p.image}`">
              <div class="motm-badge" v-if="p.motm">Member of the Month - {{ p.motm }}</div>
            </div>
            <div class="card-body" :class="{motm : !p.motm}">
              <h4 class="card-title">
                {{ p.name }}
              </h4>
              <p class="card-text">
                {{ p.bio }}
              </p>
              <a v-if="p.website !== ''" :href="p.website" class="bio">
                <p class="text-center">
                  <span class="btn btn-primary">Website</span>
                </p>
              </a>
            </div>
          </div>
      </b-card-group>
    </b-container>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:900");
@media (max-width: 985px) {
  .signinlink {
    display: none;
  }
  .scrollToggle {
    display: none;
  }
}
.scrollToggle {
  position: absolute;
  left: 20px;
  margin-top: 10px;
  z-index: 10;
}
.motm-badge {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 5px;
  width: 100%;
  position: relative;
  bottom: 28px;
}
.btn-outline-primary:hover, .btn-outline-primary:not([disabled]):not(.disabled):active, .btn-outline-primary:not([disabled]):not(.disabled).active, .show > .btn-outline-primary.dropdown-toggle {
  background-color: white;
  border-color: black;
  color: black;
}
.scroll-toggle {
  position: relative;
  color: black;
  border: 1px black solid;
}
.signinlink {
  position: absolute;
  right: 20px;
  top: 13px;
}
.signinlink a {
  color: black;
}
.jheader {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.85);
}
.bio .btn {
  margin-top: 45%;
  position: relative;
}
h1 {
  font-weight: 800;
  font-family: Roboto;
}
@media (min-width: 1200px) {
  .card-columns {
    -webkit-column-count: 4;
    column-count: 4;
    -webkit-column-gap: 1.25rem;
    column-gap: 1.25rem;
  }
  .card-columns .card {
    display: inline-block;
    width: 100%;
  }
}
.bio {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  width: 100%;
  background-color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.bio p {
  padding: 10px;
}
.jcard:hover .bio {
  opacity: 0.75;
}
.h-100 {
  height: 100%;
}
.card {
  border: none;
}
@media (min-width: 992px) {
  .container {
    max-width: 1500px;
  }
}
/* .card-body {
  position: absolute;
  bottom: 0px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
} */
.card-title {
  margin-bottom: 0px;
}
.card-body {
  margin-top: -28px;
}
.motm {
  margin-top: 0px;
}
p {
  margin-bottom: 0px;
}
.card-img-top {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  height: 100%;
}
</style>

<script>
let fps = 60
let speedFactor = 0.001
let minDelta = 0.5
let autoScrollSpeed = 5
let autoScrollTimer, restartTimer
let isScrolling = false
let prevPos = 0
let currentPos = 0
let currentTime, prevTime, timeDiff

function handleManualScroll (vm) {
  console.log(vm.isScrolling)
  vm.isScrolling = !vm.isScrolling
  currentPos = window.scrollY || window.pageYOffset
  clearInterval(autoScrollTimer)
  if (restartTimer) {
    clearTimeout(restartTimer)
  }
  restartTimer = setTimeout(() => {
    prevTime = null
  }, 50)
}

function setAutoScroll (newValue) {
  if (newValue) {
    autoScrollSpeed = speedFactor * newValue
  }
  if (autoScrollTimer) {
    clearInterval(autoScrollTimer)
  }
  autoScrollTimer = setInterval(function () {
    currentTime = Date.now()
    if (prevTime) {
      if (!isScrolling) {
        timeDiff = currentTime - prevTime
        currentPos += autoScrollSpeed * timeDiff
        if (Math.abs(currentPos - prevPos) >= minDelta) {
          isScrolling = true
          window.scrollTo(0, currentPos)
          isScrolling = false
          prevPos = currentPos
          prevTime = currentTime
        }
      }
    } else {
      prevTime = currentTime
    }
  }, 1000 / fps)
}

export default {
  methods: {
    scroll () {
      window.addEventListener('scroll', function (e) {
        currentPos = window.scrollY || window.pageYOffset
      })

      window.addEventListener('wheel', handleManualScroll)
      window.addEventListener('touchmove', handleManualScroll)

      setAutoScroll(20)
    }
  },
  created () {
    this.scroll()
  },
  data: function () {
    return {
      isScrolling: false,
      people: [
        {
          name: 'Joel Gomez',
          bio: 'Hey everyone! I’m Joel, a senior at UCR and this summer (2017), I was fortunate enough to land an internship with LinkedIn as a Site Reliability Engineer (SRE) Intern in the Sunnyvale area in Silicon Valley. For my intern project, I’m working on the backend of the People You May Know feature of LinkedIn.com.',
          website: 'https://joelgomez.me/',
          image: 'joel.jpg',
          motm: ''
        },
        {
          name: 'Elijah Marchese',
          bio: 'Even though it\'s been less than a month, working at JPL has been pretty surreal. It\'s really cool to work at a company that pioneered space exploration. Just walking around the campus, there\'s tons of information and models of these missions all around JPL, so it\'s always nice to just stop and learn and see things throughout the workday. Other opportunities to learn are JPL\'s weekly talks, journal clubs, and classes offered for interns.',
          website: '',
          image: 'elijah.jpg',
          motm: ''
        },
        {
          name: 'Jessica Gonzalez',
          bio: 'I just completed my second year at UCR as a CS student. I was fortunate enough this year to obtain a summer internship at NASA JPL. During the Fall quarter of 2016, I learned about a program called FIELDS at an ACM meeting. FIELDS is a program funded by JPL that helps UCR students get internships at UCR and/or JPL. When I heard about this program, I did not think I had the experience necessary or skills to qualify for an internship, so I was hesitant to apply.',
          website: '',
          image: 'jessica.jpg',
          motm: ''
        },
        {
          name: 'Samuel Hwang',
          bio: 'My name is Samuel Hwang. I am a fourth year computer science major studying at UC Riverside. I am interested in the software development stack as a whole from the birth of an idea to the shipment of a product. My hobbies include traveling, cooking, exercising, and listening to podcasts.',
          website: '',
          image: 'sam.jpg',
          motm: ''
        },
        {
          name: 'Paul',
          bio: 'I’m going into my 3rd year at UCR studying Electrical Engineering, and am going to be focusing on RF and communications. Outside of the classroom, I’ve kept busy by working on UCR SAE’s Electric Vehicle, hacking together (or apart…) some personal projects, and in my free time I love to get out camping whenever I get the chance.',
          website: '',
          image: 'paul.jpg',
          motm: ''
        },
        {
          name: 'Nishanth Babu',
          bio: 'Nish is a 4th year CS major. He\'s active on campus with his involvement organizations such as ACM, Tau Beta Pi, and Theta Tau.',
          website: '',
          image: 'nish.jpg',
          motm: ''
        },
        {
          name: 'Melissa Do',
          bio: '"She\'s absolutely on top of everything. As secretary of IEEE, she goes above and over. Not only is she constantly creating new flyers for IEEE and sending out emails, she plans and hosts the EE010 workshop for incoming freshmen. She teaches freshmen basics of electrical engineering to get them interested early on.',
          website: '',
          image: 'melissa.jpg',
          motm: 'October 2017'
        },
        {
          name: 'Jamie Cheu',
          bio: 'Along with her outreach co-chair Sam, Jamie organized the first Engineering R\'Future, an event catered to help high school women choose what engineering discipline they would like to pursue in college. Jamie is such a dedicated individual who loves outreach for engineering and her hard work has reached many young students in the IE.',
          website: '',
          image: 'jamie.jpg',
          motm: 'October 2017'
        },
        {
          name: 'Sam Vu',
          bio: 'She is one of the co-outreach chairs for SWE, and this month she organized the first ever, Engineering R\'Future, along with her co-chair, Jamie. This event successfully taught high school women about the different engineering fields in order to prepare them for the next step in their lives. Sam is one of the sweetest people I know and she always shows up with a smile on her face.',
          website: '',
          image: 'samvu.jpg',
          motm: 'October 2017'
        },
        {
          name: 'Pam Ycu',
          bio: 'Not only has Pam been working hard on her ME projects and volunteering for outreach events, she also organized a JPL tour for SWE and other interested engineers! She\'s always hustling through whatever life throws at her and her motivation is inspiring.',
          website: '',
          image: 'pam.jpg'
        },
        {
          name: 'Pauleen Banzuela',
          bio: 'Pauleen has just been a great engineer, friend, and leader! She takes pride in her work and has been able to manage school, club work, and her career search all while looking like a hottie! Pauleen, as SWE\'s Team Tech Lead, has been hauling ass to get company sponsorship for the team, create a Big Ideas project and submitting the pre-proposal, and start UCR\'s first bioengineering hackathon! What can\'t she do honestly! She has been showcasing leadership while remaining positive and creating a great environment for everyone that\'s interested in joining her work. She has so many big ideas and through planned implementation, not only is she bringing UCR to the front stage among other colleges, she also promotes women in engineering to work hard and shine through! She is a great role model for other engineers and she is what I aspire to be!',
          website: '',
          image: 'pauleen.jpg'
        },
        {
          name: 'Crysthal Alvarez',
          bio: 'Crysthal is a STEM transfer student mentor for Ms. Ruiz, aside from being an officer on the board for Window to the Brain Undergradupuate Research Club. Crysthal is a Mechanical Engineering major, and also does research under Dr. Aguilar\'s lab, working with bacteria on nano-ceramic materials. Crysthal\'s dedication to the club has helped the club grow, especially since she was part of the founding board that started the club.',
          website: '',
          image: 'crysthal.jpg'
        },
        {
          name: 'Anthony Castellanos',
          bio: 'Through the hard work and dedication that has been put into planning events as Outreach Director, Anthony continuously demonstrates the passion he has for outreach in our community in what he does. In carrying out the mission of SHPE to empower Hispanic communities to enter STEM fields, he takes every opportunity that arises in order to push forward towards that objective. By heading Dia de Ciencias, assisting in Noche de Ciencias, and having planned several outreach and tabling events at high schools thus far, Anthony leads by example by pushing himself to meet and exceed the expectations of being outreach director. Through his strong leadership skills, he has been able to establish and maintain a reliable and hardworking committee, through which all have greatly contributed to the success of outreach in our organization.',
          website: '',
          image: 'anthony.jpg',
          motm: 'October 2017'
        },
        {
          name: 'Steven Espinoza',
          bio: 'As a third year, he is doing well in his Mechanical Engineering classes, doing research, and has been playing a prominent role in his student organizations such as ASME and Theta Tau. He is a big personality with a big heart and wants to make everyone around him better.',
          website: '',
          image: 'steven.jpg'
        },
        {
          name: 'Kyle Kinne',
          bio: 'Kyle, the president of SAE, has been working his butt off since freshman year and is still the hardest worker on the team. Building a formula style race car is not an easy task. Not only does Kyle posses leader ship skills, but his engineering and manufacturing skills are unmatched. Kyle is very deserving of this award for the month!',
          website: '',
          image: 'kylek.jpg'
        },
        {
          name: 'Andrew Sanchez',
          bio: 'Constantly learning and teaching others about engineering concepts. Goes above and beyond to increase awareness of engineering and assist others in the pursit of knowledge.',
          website: '',
          image: 'andrew.jpg'
        },
        {
          name: 'Riya Sanghvi',
          bio: 'Riya always has a cheerful and fun personality and even when she is under a lot of stress, she maintains a level-headed professional attitude. Last year, she served as academic chair she organized many successful events such as Research Networking Night. Now that she is serving professional development chair, I have no doubt that her personality will attract many personal and professional connections for SWE members. This month she has helped with organizing a trip to go to the SWE National Conference, already doubling the previous year\'s attendance numbers. It is exciting to see what she can do in a whole year. Engineer of the month? More like engineer of the year!',
          website: '',
          image: 'riya.png'
        },
        {
          name: 'Albert Fernandez',
          bio: 'With all the changes in SHPE, Albert Zenon Fernandez has consistently stepped up to the plate, even when the event does not fall into his category. Within a week he organized the 1st General Meeting, Bourns Inc.\'s STEP Conference, and SpeedMentoring event. He is a support to the organization and a key part to this year\'s ongoing sucess.',
          website: '',
          image: 'albert.jpg'
        },
        {
          name: 'Kyle Minshall',
          bio: 'Hi! My name is Kyle Minshall. I am a second year Computer Science student at the University of California, Riverside. I have been programming for almost eight years across a wide variety of languages including PHP and Symfony, Ruby on Rails, Python, C++, Java, Swift, Objective-C, and JavaScript.',
          website: 'http://kyleminshall.com/',
          image: 'kyle.jpg'
        },
        {
          name: 'Brian Crites',
          bio: 'Graduate student spending most of my time doing research and teaching undergraduates. I do K-12 CS outreach instead of sleeping.',
          website: 'https://www.linkedin.com/in/brrcrites/',
          image: 'brian.jpg'
        },
        {
          name: 'Karen Kong',
          bio: 'My name is Karen Kong and I\'m an undergraduate Computer Science student at the University of California, Riverside. My high school\'s AP Computer Science class ignited my passion for solving challenges and expressing creativity through programming. From then on, my aspirations included earning a degree in computer science and working in the industry. To me, there\'s no greater satisfaction than designing, developing, and debugging a piece of code that is then placed into action in a larger project. In my spare time, you\'ll find me crafting planar graph algorithms and implementing system updates in the research lab and exploring Android application and game development.',
          website: 'https://kkong006.github.io/',
          image: 'karen.jpg'
        },
        {
          name: 'Aaroh Mankad',
          bio:
            'I love doing Web Development! Particular interests include but are not limited to: React, React Native, GraphQL, Neo4j, etc. Also love contributing to open source projects!',
          website: 'http://aarohmankad.com',
          image: 'aaroh.jpg'
        },
        {
          name: 'Daniel Stinson-Diess',
          bio: 'My name is Daniel Stinson-Diess and I\'m a 2nd year computer science major at UC Riverside. Academically, I\'m interested in the fields of computer security and pure mathematics. I\'m getting started with web and app development hoping to build some awesome projects!',
          website: 'http://dstindiess.net/',
          image: 'daniel.jpg'
        },
        {
          name: 'Henry Doan',
          bio: 'Senior with a cool start up',
          website: '',
          image: 'henry.jpg'
        },
        {
          name: 'Maaz Mohamedy',
          bio: 'ACM Marketing Chair',
          website: '',
          image: 'maaz.jpg'
        },
        {
          name: 'Neal Goyal',
          bio: 'I am currently a sophomore at the University of California, Riverside. I am majoring in computer science. I am interested in expanding my experience by seeking internships and research opportunities.',
          website: '',
          image: 'neal.jpg'
        },
        {
          name: 'Gustavo Correa',
          bio: 'What’s happening friends! My name is Gustavo Correa and I’m going into my third year at UCR for Computer Engineering.',
          website: 'https://www.linkedin.com/in/correagustavo/',
          image: 'gustavo.jpg'
        },
        {
          name: 'Mario Salazar',
          bio: 'As a United States Marine I have learned, instilled, and developed many leadership traits and principles that will help me throughout my career. The most significant leadership principle that has positively influenced my life is to know myself and seek self improvement. This is a principle that I life by as I strive to continuously improve in all aspects of life.',
          website: 'https://www.linkedin.com/in/mariozar/',
          image: 'mario.jpg'
        },
        {
          name: 'Sid Sharma',
          bio: 'Hello, friends!',
          website: 'http://siddhanthsharma.org/',
          image: 'sid.jpg'
        },
        {
          name: 'Patrick Le',
          bio:
            'I enjoy swimming',
          website: '',
          image: 'patrick.jpg'
        },
        {
          name: 'Zach Zimmerman',
          bio: 'Hi everyone! I’m Zach and I’ll be serving as the graduate student advisor for ACM in 2017-2018. I am a computer science PhD student and am going into my third year of the program here under my advisors Dr. Brisk and Dr. Keogh. At UCR, my research focus is on high performance computing and how we can utilize different sources of acceleration (GPUs, FPGAs, TPUs, etc.) to accelerate data mining and machine learning tasks. In particular, I am interested in time series data; examples of this are EEG and seismology readings.',
          website: 'https://www.linkedin.com/in/zpzim/',
          image: 'zach.jpg'
        },
        {
          name: 'Henry Doan',
          bio: 'Senior with a cool start up',
          website: 'https://www.linkedin.com/in/henry-doan-6b523165/',
          image: 'henry.jpg'
        },
        {
          name: 'Valerie Chiou',
          bio: 'Likes Chipotle',
          website: 'https://www.linkedin.com/in/valerie-chiou/',
          image: 'valerie.jpg'
        },
        {
          name: 'Katie Fukuda',
          bio: 'I have previously worked at Blizzard Entertainment for two summer internship opportunities and became really inspired to work with computers after my experience. Now, I am a sophomore at UC Riverside studying Computer Science, seeking real-world opportunities in the computing field.',
          website: 'https://www.linkedin.com/in/katie-fukuda/',
          image: 'katie.jpg'
        },
        {
          name: 'Daniel Lui',
          bio: 'MATLAB > All other languages',
          website: 'https://github.com/mintypaladin/',
          image: 'daniel_lui.jpg'
        }
      ]
    }
  }
}
</script>
