import { betterZodValidator } from "@libraries";
import { Hono } from 'hono'
import { repository } from '../../../data-access/repository'
import { idParams, listQueries } from './crafts.dto'

const router = new Hono()


router.get('/list', betterZodValidator('query', listQueries), async (c) => {
	const { page, count } = c.req.valid('query')
	const crafts = await repository.crafts.list(page, count)
	return c.json(crafts)
})

router.get('/:id', betterZodValidator('param', idParams), async (c) => {
	const {id} = c.req.valid('param')

	const item = await repository.items.byId(id)
	if (!item) return c.notFound()

	const craft = await repository.crafts.getCraftForItem(item)

	return craft ? c.json(craft) : c.notFound()
})

router.put('/:id', betterZodValidator('param', idParams), async (c) => {
	const {id} = c.req.valid('param')
	const recipe = await c.req.json<{ item: number; quantity: number }[]>()
	await repository.crafts.save(id, recipe)
	return c.json({ message: 'Recipe saved' })
})

export default router
