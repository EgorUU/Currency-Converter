'use client'
import { NEXT_PUBLIC_API_URL } from '@/varibles/values'
import { useSelector } from "react-redux"
import { ReactNode, useEffect, useRef, useState } from "react"
import { RootState } from '@/store/store'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface IProps {
    choice: ReactNode
}

interface IPropsValues {
    
}


const Chart: React.FC = ( ) => {



    const currentCurrency1 = useSelector((state: RootState) => state.currentCurrency.currentCurrency1)
    const currentCurrency2 = useSelector((state: RootState) => state.currentCurrency.currentCurrency2)

    const input1 = useSelector((state: any) => state.currentCurrenciesValues.currentCurrencyValue1)
    const input2 = useSelector((state: RootState) => state.currentCurrenciesValues.currentCurrencyValue2)

    const [currenciesDatas, setCurrenciesDatas] = useState<any>([].reverse())
    const canvas = useRef<HTMLCanvasElement | null>(null)
    const showChart = () => {
        if (currenciesDatas.length == (new Date().getDay() === 0 ? 7 : new Date().getDay())) {
            const ctx = canvas?.current!.getContext('2d') as CanvasRenderingContext2D;
            ctx.clearRect(0, 0, canvas?.current!.width!, canvas?.current!.height!);

            const canvasHeight: number = 600;
            const maxValue = Math.max(...currenciesDatas);
            const minValue = Math.min(...currenciesDatas);

            ctx.beginPath();
            ctx.lineWidth = 3
            
            const widthStep = chart?.current?.offsetWidth! / (new Date().getDay() === 0 ? 7 : new Date().getDay());
            console.log(widthStep);
            
            currenciesDatas.forEach((num: number, index: number) => {
                
                const positionY = canvasHeight - (num - minValue) / (maxValue - minValue) * canvasHeight;

                if (index === 0) {
                    
                    ctx.moveTo(widthStep / 2, positionY); 
                } 
                else {
                    
                    ctx.lineTo( index * widthStep + (widthStep / 2), positionY); 
                }
            });

            ctx.strokeStyle = 'rgba(31, 108, 159, 1)'; 
            ctx.stroke(); 
        }
    }
    useEffect(() => {
        
           showChart()     

        
        
    }, [currenciesDatas])
    
    const { data, isLoading,  isSuccess, isError, error } = useQuery<any>({
        queryKey: ['data'],
        queryFn: async () => {
            setCurrenciesDatas([])
            for (let i = 0; i < (new Date().getDay() === 0 ? 7 : new Date().getDay()); i++) {
                try {
                    const today = new Date();
                    const previousDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
                    
                    const dayOfPreviousDate = previousDate.getDate(); 
                    const monthOfPreviousDate = previousDate.getMonth() + 1; 
                    const yearOfPreviousDate = previousDate.getFullYear(); 

                    const formattedDate = `${dayOfPreviousDate}.${monthOfPreviousDate > 9 ? monthOfPreviousDate : `0${monthOfPreviousDate}`}.${yearOfPreviousDate}`;


                    const response = await axios.post(NEXT_PUBLIC_API_URL + '/week' as string, {data: formattedDate}); 
                                
                    const currenciesData = response.data
                    
                    
                    const currency1 = currentCurrency1 == 'RUB' ? 1 : parseFloat(currenciesData.ValCurs.Valute.find((el: any) => el.CharCode[0] === currentCurrency1).Value[0].replace(',', '.'))
                    const currency2 =  currentCurrency2 == 'RUB' ? 1 : parseFloat(currenciesData.ValCurs.Valute.find((el: any) => el.CharCode[0] === currentCurrency2).Value[0].replace(',', '.'))
                    setCurrenciesDatas((prev: any) => [...prev, (currency1 * input1) / currency2].reverse())    
                }  catch (err) {
                    console.error(err)
                }                         
            }
            return currenciesDatas
        }
    })
    useEffect(() => {
        if (isSuccess) console.log('success')
        if (isError) console.error('error')
    }, [])
    const showBlocks = () => {
        const blocks = []
        for (let i = 0; i < (new Date().getDay() === 0 ? 7 : new Date().getDay()); i++) {
            console.log('ew');
            
            blocks.push(
                <div
                key={i}
                className="day"
                onMouseLeave={(e: any) => {
                  e.target.classList.remove('hover');
                  const ctx = canvas?.current!.getContext('2d') as CanvasRenderingContext2D;
                  ctx.clearRect(0, 0, canvas?.current!.width!, canvas?.current!.height!); 
                    showChart()
                }}
                onMouseEnter={(e: any) => {
                  e.target.classList.add('hover');
                  const ctx: any = canvas?.current!.getContext('2d');
              
                  const canvasHeight = 600;
                  const maxValue = Math.max(...currenciesDatas);
                  const minValue = Math.min(...currenciesDatas);
              
                  ctx.beginPath();
              
                  
                  const widthStep = chart?.current?.offsetWidth! / (new Date().getDay() === 0 ? 7 : new Date().getDay());
              
                  
                  const radius = 3;
              
                  const num = currenciesDatas[i];
                  const positionY = canvasHeight - (num - minValue) / (maxValue - minValue) * canvasHeight;
              
                  
                  const circleX = i * widthStep + (widthStep / 2);
                  const circleY = positionY;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.font = 'bold 16px sans-serif';
                    ctx.fillText(`${currenciesDatas[i]} ${currentCurrency2}`, circleX + 40, circleY - 15);
                    ctx.fillStyle = 'black'
                  
                  ctx.beginPath();
                  ctx.arc(circleX, circleY, radius, 0, Math.PI * 2); 
                  ctx.fillStyle = 'black'; 
                  ctx.fill(); 
              
                  
                  
                }}
                style={{ width: `${chart?.current?.offsetWidth / (new Date().getDay() === 0 ? 7 : new Date().getDay())}px` }}
              ></div>)
        }
        return blocks
    }
    const showDays = () => {
        const days = []
        const months = [
            'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
            'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
          ];
        for (let i = 0; i < (new Date().getDay() === 0 ? 7 : new Date().getDay()); i++) {
            days.push(<h1 style={{width: `${chart?.current?.offsetWidth / (new Date().getDay() === 0 ? 7 : new Date().getDay())}px`}}>{((new Date().getDate() - 6) + i) + ` ${months[new Date().getMonth() + 1]}`}</h1>)
        }
        return days
    }
    const chart = useRef<any>(null)
    return (
    <div className="statistics-chart-wrapper">
        <div className="statistics-chart" ref={chart}>
            <div className="statistics-chart-days">
                {
                    isLoading ? <div>loading...</div> : showBlocks()
                }
            </div>
            <canvas width="900" height="600" id="chart-canvas" ref={canvas}></canvas>
        </div>
        <div className="statistics-days">
            {showDays()}
        </div>
    </div>
  )
}

export default Chart