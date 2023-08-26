import { defineStore } from 'pinia'

interface IState {
    currentStep: number
    steps: string[]
    data: any
}
export const useStepper = defineStore('stepper', {
    state: (): IState => {
        return {
            currentStep: 0,
            steps: ['product', 'team', 'economy', 'presentation'],
            data: {
                product: [
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
                    },
                    {
                        label: 'Продукт',
                        value: '',
                        key: 'field'
                    }
                ],
                team: [
                    {
                        key: '',
                        value: ''
                    },
                ],
                economy: [
                    {
                        label: 'Клиенты',
                        value: '',
                        key: 'number_of_clients',
                        tooltip: 'Количество клиентов, которые пользуются вашими услугами.'
                    },
                    {
                        label: 'Доход',
                        value: '',
                        key: 'revenue',
                        tooltip: 'Общий доход от продаж.'
                    },
                    {
                        label: 'APRU',
                        value: '',
                        key: 'APRU',
                        tooltip: 'ARPU, или средняя выручка на одного пользователя — это метрика, которая помогает оценить ценность продукта с точки зрения клиентов. ARPU показывает, сколько денег в среднем приносит компании один пользователь за определенный промежуток времени.'
                    },
                    {
                        label: 'Доля ушедших клиентов.',
                        value: '',
                        key: 'churn_rate',
                        tooltip: 'Доля ушедших клиентов.'
                    },
                    {
                        label: 'LT',
                        value: '',
                        key: 'LT',
                        tooltip: 'Срок жизни (LT) — время, которое клиент пользуется вашими услугами. Или сколько месяцев прошло между первым и последним заказом.'
                    },
                    {
                        label: 'LTV',
                        value: '',
                        key: 'LTV',
                        tooltip: 'Пожизненная ценность клиента (LTV) — сколько клиент заплатил вам денег за срок жизни.'
                    },
                ],
            }
        }
    },
    getters: {
        stepName: (state) => {
            return state.steps[state.currentStep]
        }
    }
})

