import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import styled from 'styled-components'

const NavBar = () => {
    return (
        <>
            <Nav variant='tabs'>
                <Nav.Item>
                    <Nav.Link href='/home'>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/add'>Add note</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/remove'>Remove note</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/list'>List notes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/read'>Read note</Nav.Link>
                </Nav.Item>
            </Nav>
            <Outlet />
        </>
    )
}

export default NavBar
