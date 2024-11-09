import './App.scss'
import '@styles/examplePage.scss'

import { useStateTogether } from 'react-together'

import { version } from '@package'
import { HeroLogo } from '@components'

export default function App() {
  const [count, set_count] = useStateTogether('counter_0', 0)

  return (
    <div>
      <div>
        <HeroLogo {...{ type: 'reacttogether' }} /> <h1>ReactTogether</h1>
        <HeroLogo {...{ type: 'react' }} /> <h1>Vite</h1>
        <HeroLogo {...{ type: 'vite' }} /> <h1>React</h1>
      </div>
      <h1>ReactTogether + Vite + React</h1>

      <div className='card'>
      <div className="menu-container">
      <button onClick={() => console.log("Button clicked")}>Click Me</button>
          <div className="menu-dropdown" id="menuDropdown">
            <a href="#">Option 1</a>
           <a href="#">Option 2</a>
           <a href="#">Option 3</a>
        </div>
      </div>
        <button onClick={() => set_count((count) => count + 1) }>Synq'd count is {count}</button> 
        {/* <button onClick={() => set_count((count) => count + 1)}>Synq'd count is {count}</button> */}
        <button {...{ style: { marginLeft: '1rem' }, onClick: () => set_count(0) }}>Reset</button>

        <button {...{ style: { marginLeft: '1rem' }, onClick: () => set_count((count) => count + 100) }}>Add 100</button>
      </div>
      <p className='read-the-docs'>Click on the respective logos to learn more.</p>

      <div className='version-num'>{version}</div>
    </div>
  )
}
