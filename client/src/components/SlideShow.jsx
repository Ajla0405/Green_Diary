import Carousel from "react-bootstrap/Carousel";
import heroImage1 from "../images/heroImage1.jpg";
import heroImage2 from "../images/heroImage2.png";
import heroImage3 from "../images/heroImage3.png";
import heroImage4 from "../images/heroImage4.jpg";
import monstera4 from "../images/monstera4.jpg";

function SlideShow() {
  return (
    <Carousel>
      <Carousel.Item interval={1800}>
        <img src={monstera4} alt="many succulents" width={800} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img src={heroImage2} alt="philodendron" width={800} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={800}>
        <img src={heroImage3} alt="monstera deliciosa" width={800} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={heroImage4} alt="rubber plant" width={800} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SlideShow;
