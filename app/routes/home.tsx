import { Welcome } from '../welcome/welcome'
import { type Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
       return [
               { title: 'Car Tracker - SMOC Oil Change Outreach' },
               {
                       name: 'description',
                       content:
                               'Track cars through the oil change process during our church outreach ministry event.',
               },
       ]
}

export default function Home() {
       return <Welcome />
}
