import Button from 'react-bootstrap/Button';
import { globalButtonStyle } from '../styles/buttonStyle';

export default function Home() {

  return (
    <div>
      <p>Crafting Adventures and Endless Creativity:</p>
      <p>Your Journey Awaits.</p>
      <Button style={globalButtonStyle}>Start Exploring</Button>
    </div>
  )
}