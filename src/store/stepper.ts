import { defineStore } from 'pinia'
import type {IStepData} from "@/types/types";


interface IState {
    currentStep: number
    steps: string[]
    data: Array<IStepData[]>
}
export const useStepper = defineStore('stepper', {
    state: (): IState => {
        return {
            currentStep: 0,
            steps: ['product', 'company', 'economy'],
            data: [
                [
                    {
                        label: 'Идея',
                        value: '',
                        key: 'idea'
                    },
                    {
                        label: 'План развития',
                        value: '',
                        key: 'roadmap'
                    },
                    {
                        label: 'Рынок',
                        value: '',
                        key: 'market'
                    }
                ],
                [
                    {
                        label: 'Сотрудник',
                        value: '',
                    },
                ],
                [
                    {
                        label: 'Клиенты',
                        value: '',
                        key: 'number_of_clients'
                    },
                    {
                        label: 'Доход',
                        value: '',
                        key: 'revenue'
                    },
                    {
                        label: 'APRU',
                        value: '',
                        key: 'APRU'
                    },
                    {
                        label: 'churn_rate',
                        value: '',
                        key: 'churn_rate'
                    },
                    {
                        label: 'LT',
                        value: '',
                        key: 'LT'
                    },
                    {
                        label: 'LTV',
                        value: '',
                        key: 'LTV'
                    },
                ],
            ]
        }
    },
})

