import React from 'react';
import './Contact.css';

function Contact() {
  const teamMembers = [
    {
      name: 'Prachod Kakatur',
      title: 'Software Engineer',
      linkedIn: 'https://www.linkedin.com/in/prachod-kakatur',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQHLEo5sjxWUHw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726093007926?e=1733961600&v=beta&t=vRwbhGe0S6jeWI2_dt-79yUFFC0Z9qAqv6oGxkKv8bs    ',  // Local image path or LinkedIn profile picture URL
    },
    {
      name: 'Fatheen Ahmed',
      title: 'Software Engineer',
      linkedIn: 'https://www.linkedin.com/in/fatheenillinois/',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQHr98_4qZwr-g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1690912032204?e=1733961600&v=beta&t=r23YKHbl9Bnp4WPsdskFEBf6qysRtR-gx2Tx8Kk-d38',
    },
    {
      name: 'Prasheetha Bairwa',
      title: 'Software Engineer',
      linkedIn: 'https://www.linkedin.com/in/prasheetha-bairwa-3ba164326/',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQEnRfUmIA8wHA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726090317563?e=1733961600&v=beta&t=rQlDVXzE70nYmTxsKp7iTNk85YIudYX_bjlLed5LtIc',
    },
    {
      name: 'Sophie Lin',
      title: 'Software Engineer',
      linkedIn: 'https://www.linkedin.com/in/sophie-lin-b7aabb321/',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQGs9wpapNmLYg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722976873185?e=1733961600&v=beta&t=_AdvC6Lu4epbTwcKa23kNx2Q9UchkPdjVFe7DD9eumE',
    },
    {
      name: 'Chinmay Rawat',
      title: 'Software Engineer',
      linkedIn: 'https://www.linkedin.com/in/chinmay-rawat-100977219/',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQERisMZ8qATiQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718904095649?e=1733961600&v=beta&t=ypEJyZ1kOCtkjaLr0fGR5Ti6wrZC6I11uQUYkICsRn0',
    },
    {
      name: 'Daniel Golonka',
      title: 'Software Engineer',
      linkedIn: 'https://www.linkedin.com/in/daniel-golonka-661520234/',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQETmG7i6QFFxA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1699832230736?e=1733961600&v=beta&t=By49TvGKcHn79kxHz8xPvVqbqP2Wot5CgvgUOp2ehBI',
    },
  ];

  return (
    <div className="contact-page">
      <h1 className="page-header">Meet the Team</h1>
      <div className="linkedin-cards">
        {teamMembers.map((member, index) => (
          <div key={index} className="linkedin-card info-card">
            <img src={member.image} alt={`${member.name}'s headshot`} className="linkedin-headshot" />
            <h3>{member.name}</h3>
            <p>{member.title}</p>
            <a href={member.linkedIn} target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
