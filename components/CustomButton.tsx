import Image from 'next/image';
import React, { MouseEventHandler } from 'react'
import { types } from 'util'

type CustomButtonProps = {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>
    btnType?: "button" | "submit";
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
}

export default function CustomButton(props: CustomButtonProps) {
    return (
        <button
            disabled={props.isDisabled}
            type={props.btnType || "button"}
            className={`custom-btn ${props.containerStyles}`}
            onClick={props.handleClick}
        >
            <span className={`flex-1 ${props.textStyles}`}>{props.title}</span>
            {props.rightIcon && (
                <div className="relative w-6 h-6">
                    <Image
                        src={props.rightIcon}
                        alt="arrow_left"
                        fill
                        className="object-contain"
                    />
                </div>
            )}
        </button>
    )
}

