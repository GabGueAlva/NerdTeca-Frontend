/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import  {ReactNode } from 'react';
import useModalLogic from './ModalLogic';

interface ModalOptions {  [key: string]: any; }

interface ModalReturn {
	toggleModal: () => void;
	closeModalAction: () => void;
	Render: ({ children }: { children: ReactNode }) => JSX.Element | null;
}

const useModal = (options: ModalOptions = {}): ModalReturn => {
	const {
		isOpen,
		toggleModal,
		closeModalAction,
		classModal
	} = useModalLogic(options)
 
  	const Render= ({ children }: { children: ReactNode }): JSX.Element | null => {
		
   return isOpen ? (
      <div className="fixed z-[100] left-0 top-0 w-full h-screen bg-[rgba(0,0,0,.3)] flex justify-center items-center p-5 ">
        	<div className={`${classModal}`}>
				<div className='w-full font-medium flex justify-between bg-white'>
					<div className='text-xl'>{options.title?options.title:null}</div>
					<button 
						onClick={toggleModal}
						className="text-gray-400">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
							</svg>
					</button>
				</div>
				{children}
        	</div>
      </div>
    ) : null;
  };

  return {  toggleModal, Render, closeModalAction};
};

export default useModal;