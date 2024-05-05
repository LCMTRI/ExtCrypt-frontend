"use client"

import React, {useState} from 'react';
import { Button } from '../ui/button';
import { Icons } from '../icons';

export const ScrollToTopButton = () =>{ 
	const [visible, setVisible] = useState(false) 

	const toggleVisible = () => { 
		const scrolled = document.documentElement.scrollTop; 
		if (scrolled > 10){ 
			setVisible(true)
		} 
		else if (scrolled <= 10){ 
			setVisible(false) 
		} 
	}; 

	const scrollToTop = () =>{ 
		window.scrollTo({ 
		top: 0, 
		behavior: 'smooth'
		/* you can also use 'auto' behaviour 
			in place of 'smooth' */
		}); 
	}; 

	if (window) window.addEventListener('scroll', toggleVisible);

	return ( 
		<Button size="icon" className={`fixed bottom-8 right-8 ${visible ? 'block' : 'hidden'}`} onClick={scrollToTop}>
			<Icons.chevronsUp className='inline'	/>
		</Button> 
	); 
}
