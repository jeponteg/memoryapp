import React, { FC } from 'react'

interface ModalProps {
    onClick: () => void;
}

const Modal: FC<ModalProps> = ({ onClick }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg text-center">
                <h2 className="text-2xl font-semibold mb-4">
                    ¡Felicidades! Has completado el juego con éxito
                </h2>
                <button
                    onClick={onClick}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none"
                >
                    Repetir Juego
                </button>
            </div>
        </div>
    )
}

export default Modal