'use client'
import '@/scss/currency.scss'
import { GoArrowSwitch } from "react-icons/go"
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap' 
import { NEXT_PUBLIC_API_URL } from '@/varibles/values'
import { IReducer } from '@/store/reducers/currentCurrencyes'
import { useSelector, useDispatch } from 'react-redux'
import { setFirstCurrentCurrency, setSecondCurrentCurrency } from '@/store/reducers/currentCurrencyes'
import { HiArrowLongRight } from "react-icons/hi2";
import { RootState } from '@/store/store'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { AddCurrencies } from '@/store/reducers/currenciesReducer'
import { useQuery } from '@tanstack/react-query'
import { setFirstCurrentCurrencyValue, setSecondCurrentCurrencyValue } from '@/store/reducers/currentValues'
const CurrencyConverter: React.FC = () => {
    const dispatch = useDispatch()
    const currentCurrency1 = useSelector((state: RootState) => state.currentCurrency.currentCurrency1)
    const currentCurrency2 = useSelector((state: RootState) => state.currentCurrency.currentCurrency2)
    const currenciesData = useSelector((state: any) => state.currenciesReducer?.ValCurs)
    const { data, isLoading,  isSuccess, isError, error } = useQuery<any>({
        queryKey: ['currencies'],
        queryFn: async () => {
            const response = await axios.get(NEXT_PUBLIC_API_URL as string);
            return response.data;
        },
        
    })


    useEffect(() => {
        if (isSuccess) {
            console.log("Данные успешно добавлены", data);
            (async () => {
                await dispatch(AddCurrencies(data))                
            })()
            
            
        }
        if (isError) {
            console.error('Ошибка', error)
        }
        
        
    }, [data])

    const [currenciesNames, setCurrenciesNames] = useState<string[] | null>(null)

    useEffect(() => {
        if (currenciesData && currenciesData.ValCurs && currenciesData.ValCurs.Valute) {
            try {
                // Формируем список валютных символов
                const currenciesNames = currenciesData.ValCurs.Valute.map((el: any) => el.CharCode);
                setCurrenciesNames([...currenciesNames, "RUB"]);
            } catch (err: any) {
                console.error('Ошибка при обработке валют:', err.message);
            }
        }
    }, [currenciesData]);

    const input1 = useSelector((state: RootState) => state.currentCurrenciesValues.currentCurrencyValue1)
    const input2 = useSelector((state: RootState) => state.currentCurrenciesValues.currentCurrencyValue2)
    return (
        <div className="currency-table">
            <div className="currency-table-item-1">
                <input type="number" value={input1} onChange={async (e: any) => {
                    await dispatch(setFirstCurrentCurrencyValue(e.target.value))
                    const currency1 = currentCurrency1 == 'RUB' ? 1 : parseFloat(currenciesData.ValCurs.Valute.find((el: any) => el.CharCode[0] === currentCurrency1).Value[0].replace(',', '.'))
                    const currency2 = currentCurrency2 == 'RUB' ? 1 : parseFloat(currenciesData.ValCurs.Valute.find((el: any) => el.CharCode[0] === currentCurrency2).Value[0].replace(',', '.'))
                    
                    dispatch(setSecondCurrentCurrencyValue('' + (currency1 * e.target.value) / currency2))
                                                             
                }}/>
                <Dropdown className='btn-success'>
                    {   
                        <DropdownToggle disabled={currenciesNames ? false : true} variant="success" className={!currenciesNames ? "button-loading" : ""}   id="dropdown-basic">{!isLoading ? currentCurrency1 : isLoading ? (<div className="spinner-border" style={{width: "20px", height: "20px"}}role="status"><span className="visually-hidden">Загрузка...</span></div>) : "Выбрать Валюту"}</DropdownToggle>
                    }
                    {
                        !isLoading && <DropdownMenu style={{width: "100%", height: "200px", overflowY: "auto"}}>
                        {
                            currenciesNames ? (
                                <>
                                    {
                                        currenciesNames.map((name: string, index: number) => (
                                            <DropdownItem key={index} onClick={(e: any) => {
                                                const currencyText = e.currentTarget.textContent
                                                if (currencyText) {
                                                    dispatch(setFirstCurrentCurrency(currencyText))
                                                }
                                            }}>{name}</DropdownItem>
                                        ))
                                    }
                                </>
                            ) : ""
                        }
                    </DropdownMenu>
                    }
                </Dropdown>
            </div>
            <div className="currency-table-reverse" onClick={async () => {
                dispatch(setFirstCurrentCurrency(currentCurrency2))
                dispatch(setSecondCurrentCurrency(currentCurrency1))
                dispatch(setFirstCurrentCurrencyValue(input2))
                dispatch(setSecondCurrentCurrencyValue(input1))
            }}>
                <GoArrowSwitch />
            </div>
            <div className="currency-table-item-2">
                <input type="number" value={input2} onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                   await dispatch(setSecondCurrentCurrencyValue(e.target.value))
                   const currency1 = await currentCurrency1 == 'RUB' ? 1 : parseFloat(currenciesData.ValCurs.Valute.find((el: any) => el.CharCode[0] === currentCurrency1).Value[0].replace(',', '.'))
                   const currency2 = await currentCurrency2 == 'RUB' ? 1 : parseFloat(currenciesData.ValCurs.Valute.find((el: any) => el.CharCode[0] === currentCurrency2).Value[0].replace(',', '.'))
                   
                   dispatch(setFirstCurrentCurrencyValue('' + (currency2 * Number(e.target.value)) / currency1))
                   console.log('' + (currency2 * Number(e.target.value)) / currency1);
                   
                

                }}/>
                <Dropdown>
                {
                        <DropdownToggle disabled={currenciesNames ? false : true} variant="success" className={!currenciesNames ? "button-loading" : ""}   id="dropdown-basic">{!isLoading ? currentCurrency2 : isLoading ? (<div className="spinner-border" style={{width: "20px", height: "20px"}}role="status"><span className="visually-hidden">Загрузка...</span></div>) : "Выбрать Валюту"}</DropdownToggle>
                    }
                    {
                        !isLoading && <DropdownMenu style={{width: "100%", height: "200px", overflowY: "auto"}}>
                        {
                            currenciesNames ? (
                                <>
                                    {
                                        currenciesNames.map((name: string, index: number) => (
                                            <DropdownItem key={index} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                                                const currencyText = e.currentTarget.textContent
                                                if (currencyText) {
                                                    dispatch(setSecondCurrentCurrency(currencyText))
                                                }
                                            }}>{name}</DropdownItem>
                                        ))
                                    }
                                </>
                            ) : ""
                        }
                    </DropdownMenu>
                    }
                </Dropdown>
            </div>
        </div>
    )
}

export default CurrencyConverter