import React, { ReactNode } from "react";

interface CardProps {
    children: React.ReactNode
    className?: string
}

const Card: React.FC<CardProps> = (props: Readonly<CardProps>) =>  {
    return (
        <div className={`p-3 shadow-lg ${props.className ? props.className : ""}`}>
            {props.children}
        </div>
    )
}

export default Card

