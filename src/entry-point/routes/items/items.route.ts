import { Hono } from 'hono'
import { itemSeachQuery } from './items.dto'
import { repository } from '../../../data-access/repository'

const router = new Hono()

router.get('/search', async (c) => {
	const queries = itemSeachQuery.parse(c.req.query())
	const items = await repository.items.find(queries.search)

	return c.json(items)
})

export default router
