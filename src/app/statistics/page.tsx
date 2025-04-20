'use client'
import '@/scss/statistics.scss'
import {Ubuntu} from 'next/font/google'
import { useState } from 'react'
import Chart from '../components/Chart'

const ubuntu = Ubuntu({
    subsets: ['latin'], 
    weight: ['400']
})

const Statistics: React.FC = () => {
  const [choice, setChoice] = useState<number>(1)
  return (
    <div className="statistics">
        <div className='choices'>
            <h1 className={ubuntu.className}>График изменения курса валюты</h1>
            <div className="choices-buttons">
                <div className='choices-buttons-item week active'><h1>За неделю</h1></div>
            </div>
        </div>
        <Chart  />
    </div>
  )
}

export default Statistics