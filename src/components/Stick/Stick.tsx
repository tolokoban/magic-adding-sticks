import React from "react"

import styles from "./Stick.module.css"
import { colors } from "@/constants"

export interface StickProps {
    className?: string
    value: [number, number, number, number]
    onClick(): void
}

export default function Stick({ className, value, onClick }: StickProps) {
    return (
        <button className={join(className, styles.stick)} onClick={onClick}>
            {value.map((digit, index) => (
                <div key={index} style={{ color: colors[index] }}>
                    {digit}
                </div>
            ))}
        </button>
    )
}

function join(...classes: unknown[]): string {
    return classes.filter((cls) => typeof cls === "string").join(" ")
}
