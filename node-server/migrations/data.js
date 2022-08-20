const songs = [
  {
    title: 'Zaalima',
    duration: '02:52',
    slug: 'zaalima',
    description:
      'Raees | Shah Rukh Khan & Mahira Khan | Arijit Singh & Harshdeep Kaur | JAM8 | Pritam',
  },
  {
    title: 'Janib Duet',
    duration: '03:41',
    slug: 'janib',
    description:
      'Dilliwaali Zaalim Girlfriend | Arijit Singh | Divyendu Sharma',
  },
  {
    title: 'Gerua',
    duration: '04:44',
    slug: 'gerua',
    description:
      'Dilwale | Shah Rukh Khan| Kajol | SRK Kajol Official Lyric Video',
  },
  {
    title: 'Teri Aankhoon Mein',
    duration: '01:59',
    slug: 'teri-aankhon-mein',
    description: 'Divya Khosla Kumar, Pearl V Puri | Darshan R, Neha K',
  },
  {
    title: 'Leja Re',
    duration: '03:16',
    slug: 'leja-re',
    description: 'Dhvani Bhanushali | Tanishk Bagchi',
  },
  {
    title: 'Labon Pe Naam',
    duration: '04:38',
    slug: 'labon-pe-naam',
    description:
      'Radhe Shyam | Prabhas, Pooja H | Amaal Mallik, Armaan Malik, Rashmi Virag',
  },
  {
    title: 'Khuda Aur Mohabbat',
    slug: 'khuda-aur-mohabbat',
    duration: '06:09',
    description: 'OST | Rahat Fateh Ali Khan | Nish Asher | Har Pal Geo',
  },
  {
    title: 'Aye Musht-e-Khaak',
    duration: '04:36',
    slug: 'aye-musht-e-khaak',
    description:
      'OST | Shani Arshad | Yashal Shahid | Feroze Khan | Sana Javed | Har Pal Geo',
  },
  {
    title: 'Piya O Re Piya',
    duration: '05:10',
    slug: 'piya-o-re-piya',
    description:
      'Tere Naal Love Ho Gaya | Riteish Deshmukh, Genelia | Atif Aslam, Shreya',
  },
  {
    title: 'Tera Hone Laga Hoon',
    duration: '05:00',
    slug: 'tera-hone-laga-hoon',
    description:
      'Ajab Prem Ki Ghazab Kahani | Atif Aslam | Ranbir, Katrina K | Pritam',
  },
  {
    title: 'Teri Ore',
    duration: '05:10',
    slug: 'teri-ore',
    description: 'Singh Is KingFull Song with Akshay Kumar and Katrina Kaif',
  },
  {
    title: 'Dino ki Dulhaniya',
    duration: '03:04',
    slug: 'dino-ki-dulhaniya',
    description: 'Dino ki Dulhaniya | OST | Mustahsan Khan',
  },
  {
    title: 'Ae Dil Hai Mushkil',
    duration: '02:58',
    slug: 'ae-dil-hai-mushkil',
    description:
      'Full Song Video | Karan Johar | Aishwarya, Ranbir, Anushka | Pritam | Arijit',
  },
  {
    title: 'Rang Mahal',
    duration: '05:14',
    slug: 'rang-mahal',
    description:
      'OST | Sahir Ali Bagga | Hamid Ali Naqeebi Qawwal | Har Pal Geo',
  },
  {
    title: 'Ehd-e-Wafa',
    duration: '04:23',
    slug: 'ehd-e-wafa-sad',
    description:
      'Ehd-e-Wafa OST | Ali Zafar, Asim Azhar, Sahir Ali Bagga & Aima Baig - (ISPR Official Song)',
  },
  {
    title: 'Raaz-e-Ulfat',
    duration: '05:12',
    slug: 'raaz-e-ulfat',
    description:
      'OST | Shahzad Sheikh | Yumna Zaidi | Aima Baig | Shani Arshad | Geo TV | Har Pal Geo',
  },
  {
    title: 'Ibadat',
    duration: '',
    slug: 'ibadat-Ishq-e-laa',
    description: 'Ishq-e-Laa - New Lyrical OST - HUM TV',
  },
  {
    title: 'Agar Tum Saath Ho',
    duration: '05:41',
    slug: 'agar-tum-saath-ho',
    description:
      'AUDIO Song | Tamasha | Ranbir Kapoor, Deepika Padukone | T-Series',
  },
  {
    title: 'Yara Teri Yari Dil ki sadah',
    duration: '01:52',
    slug: 'ehd-e-wafa-happy',
    description:
      'Ehd e Wafa | Full OST | Rahat Fateh Ali Khan - Digitally Presented by Master Paints HUM TV Drama',
  },
  {
    title: 'Ye ishq tum na krana',
    duration: '05:38',
    slug: 'ye-ishq-tum-na-krana',
    description:
      'Mere Humsafar - Ye ishq tum na krana (Slowed+Reverb) Mu♡ic Soul 🌚',
  },
]

const artists = [
  { name: 'Arijit Singh', slug: 'arjeet' },
  { name: 'Harshdeep Kaur', slug: 'harshdeep' },
  { name: 'Armaan Malik', slug: 'arman' },
  { name: 'Rahat Fateh Ali Khan', slug: 'rahat' },
  { name: 'Ali Zafar', slug: 'ali' },
  { name: 'Azaan Sami Khan', slug: 'azaan' },
  { name: 'Yumna Zaidi', slug: 'yumna' },
  { name: 'Sahir Ali Bagga', slug: 'sahir' },
  { name: 'Mustahsan Khan', slug: 'mustahsin' },
  { name: 'Atif Aslam', slug: 'ataf' },
]

module.exports = { songs, artists }
