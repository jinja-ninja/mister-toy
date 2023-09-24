import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { toyService } from '../services/toy.service'
import { loadToys } from '../store/actions/toy.actions'


ChartJS.register(ArcElement, Tooltip, Legend)

export function PieChart() {

    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [toys])

    const toysWithLabel = toyService.getToyLabels().map(label => {
        return toys.reduce((acc, toy) => {
            if (toy.labels.includes(label)) acc++
            return acc
        }, 0)
    })

    const data = {
        labels: toyService.getToyLabels(),
        datasets: [
            {
                label: '# of Toys with this label',
                data: toysWithLabel,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(33, 145, 210, 0.2)',
                    'rgba(132, 212, 15, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(33, 145, 210, 1)',
                    'rgba(132, 212, 15, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return <Pie data={data} />
}
