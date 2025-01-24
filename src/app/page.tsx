import React from "react"
import { ViewButton, ViewPanel } from "@tolokoban/ui"

import styles from "./page.module.css"
import Stick from "@/components/Stick"
import { colors } from "@/constants"

export default function Page() {
    const [sticks, setSticks] = React.useState(() => [
        makeStick(),
        makeStick(),
        makeStick(),
        makeStick(),
    ])
    const [a, b, c, d] = getNumbersToAddFromSticks(sticks)
    const [mode, setMode] = React.useState<"guess" | "check">("guess")
    const updateStick = (index: number) => {
        const newSticks = [...sticks]
        newSticks[index] = makeStick()
        setSticks(newSticks)
    }

    return (
        <ViewPanel
            display="grid"
            placeItems="center"
            fullsize
            position="absolute"
            fontSize="3vh"
            className={styles.page}
        >
            <ViewPanel
                display="grid"
                gridTemplateRows="1fr 2fr 2fr"
                gap="S"
                padding="L"
            >
                <div>
                    <p>
                        Tap on the sticks below to randomly change their
                        numbers.
                    </p>
                </div>
                <div className={styles.sticks}>
                    {sticks.map((stick, index) => (
                        <Stick
                            key={index}
                            value={stick}
                            onClick={() => updateStick(index)}
                        />
                    ))}
                </div>
                <footer>
                    {mode === "guess" && <p>Try to guess the value of</p>}
                    <big>
                        <span style={{ background: colors[0] }}>{a}</span>+
                        <span style={{ background: colors[1] }}>{b}</span>+
                        <span style={{ background: colors[2] }}>{c}</span>+
                        <span style={{ background: colors[3] }}>{d}</span>
                        {mode === "check" && (
                            <>
                                = <big>{a + b + c + d}</big>
                            </>
                        )}
                    </big>
                    {mode === "guess" && (
                        <ViewButton
                            variant="elevated"
                            color="neutral-9"
                            onClick={() => setMode("check")}
                        >
                            Tap to display the result
                        </ViewButton>
                    )}
                    {mode === "check" && (
                        <ViewButton
                            variant="elevated"
                            color="neutral-9"
                            onClick={() => setMode("guess")}
                        >
                            Tap to hide the result
                        </ViewButton>
                    )}
                </footer>
            </ViewPanel>
        </ViewPanel>
    )
}

function makeStick(): [number, number, number, number] {
    const a = rnd(1, 9)
    const b = rnd(9 - a, 9)
    const c = rnd(2, 9)
    const d = 18 - a - b
    return [a, b, c, d]
}

function rnd(min: number, max: number) {
    return min + Math.floor((max + 1 - min) * Math.random())
}

function getNumbersToAddFromSticks([a, b, c, d]: [
    number,
    number,
    number,
    number,
][]): [number, number, number, number] {
    return [
        1000 * a[0] + 100 * b[0] + 10 * c[0] + d[0],
        1000 * a[1] + 100 * b[1] + 10 * c[1] + d[1],
        1000 * a[2] + 100 * b[2] + 10 * c[2] + d[2],
        1000 * a[3] + 100 * b[3] + 10 * c[3] + d[3],
    ]
}
