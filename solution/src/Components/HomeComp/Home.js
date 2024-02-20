import bannerImage from './banner.png';
const About = () => {


  return (
    <div >
      <img src={bannerImage} style={
        {
          width: '98%',
          height: '50vh',
          margin: '11px',
          marginTop: '-6px',
        }
      }></img>
    </div>
  )
}

export default About