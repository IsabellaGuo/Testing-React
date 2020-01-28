import React from 'react'

import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, wait} from '@testing-library/react';

import {getData as mockGetData} from '../api/index';
import StarWarsCharacters from './StarWarsCharacters'

jest.mock('../api')

test('Goes to next or goes to previous', async() =>{

const testData =
  {
    results: [
        {
          name: 'testName',
          id: 1
        }
            ],
            next: 'testNext',
            previous: 'testPrevious'
    }
     
mockGetData.mockResolvedValueOnce(testData)
     
const { getByText } = render(<StarWarsCharacters />)
const testNextButton = getByText(/next/i)
const testPreviousButton = getByText(/previous/i)
     
     
     
fireEvent.click(testNextButton)
fireEvent.click(testPreviousButton)
expect(mockGetData).toHaveBeenCalledTimes(1)
     
wait(() => expect(getByText(/'Darth'/i)))
})