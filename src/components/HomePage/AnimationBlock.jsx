import React from 'react'
import ButtonComp from './Button'
import { TypeAnimation } from 'react-type-animation'

const AnimationBlock = ({heading, description, ButtonText1, active1, ButtonText2, active2, link1, link2, position, codecolor, backgroundGradient}) => {

    const codesnippet = `<!DOCTYPE html>
                <head>
                    <meta charset="utf-8" />
                    <link rel="icon" href="favicon.ico" />
                    <title>CodeCraft</title>
                </head>
                <body>
                    <h1>Welcome to CODECRAFT</h1>
                </body>
                </html>
            `;

  return (
    <div className={`flex ${position} my-20 justify-center flex-col lg:gap-10 gap-10`}>

        {/* Text section  */}

        <section className="w-[100%] lg:w-[50%] flex flex-col gap-8">
            <h2>
                {heading}
            </h2>
            <p className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
                {description}
            </p>

            <div className="flex gap-7 mt-7">
                <ButtonComp active={active1} linkTo={link1}>
                    {ButtonText1}
                </ButtonComp>
                <ButtonComp active={active2} linkTo={link2}>
                    {ButtonText2}
                </ButtonComp>
            </div>
        </section>



        {/* code section */}
        
        <section className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
            {backgroundGradient}
            <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold ">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>

            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono  ${codecolor} pr-1`}>

                <TypeAnimation
                    sequence={[codesnippet, 5000, ""]}
                    cursor={true}
                    repeat={Infinity}
                    style={{
                    whiteSpace: "pre-line",
                    display: "block",
                    }}
                    omitDeletionAnimation={true}
                />

            </div>

        </section>

    </div>
  )
}

export default AnimationBlock