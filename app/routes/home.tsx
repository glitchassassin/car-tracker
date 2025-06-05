import { Welcome } from '../welcome/welcome'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Car Tracker' },
		{ name: 'description', content: 'Car Tracker' },
	]
}

export async function loader({ context }: Route.LoaderArgs) {
	try {
		// Get car count from database using direct D1 SQL query
		const result = await context.db
			.prepare('SELECT COUNT(*) as count FROM cars')
			.first()
		const carCount = result?.count || 0

		return {
			message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
			carCount,
		}
	} catch (error) {
		console.error('Database error:', error)
		return {
			message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
			carCount: 0,
		}
	}
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const enhancedMessage = `${loaderData.message} - Currently tracking ${loaderData.carCount} cars`
	return <Welcome message={enhancedMessage} />
}
