'use client'

import '@/scss/header.scss'
import Link from "next/link"
import { Navbar, Nav, Container, NavItem } from "react-bootstrap"
import Image from "next/image"
import Logo from '@/images/dollar-square-svgrepo-com.svg'


const Header: React.FC = () => {
    return (
        <header>
            <Navbar style={{padding: "10px 15px", borderBottom: "1px solid rgba(0, 0, 0, 0.1)"}}>
                <Navbar.Brand><Link className="navbar-brand" href="/"><Image src={Logo} width={30} height={30} style={{marginRight: "5px"}}/><h1>Конвертер Валют</h1></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                   <Nav>
                     <NavItem>
                        <Link href="/" className='nav-link'>Валюты</Link>
                     </NavItem>
                     <NavItem>
                        <Link href="/statistics" className='nav-link'>Ститистика</Link>
                     </NavItem>
                   </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header