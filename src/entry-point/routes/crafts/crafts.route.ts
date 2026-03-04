import { Hono } from 'hono'
import { idParams } from './crafts.dto'
import { repository } from '../../../data-access/repository'

const router = new Hono()

router.get('/:id', async (c) => {
	const id = idParams.parse(c.req.param('id'))

	const item = await repository.items.byId(id)
	if (!item) return c.notFound()

	const craft = await repository.crafts.getCraftForItem(item)

	return craft ? c.json(craft) : c.notFound()
})

router.put('/:id', async (c) => {
	const id = idParams.parse(c.req.param('id'))
	const recipe = await c.req.json<{ item: number; quantity: number }[]>()
	await repository.crafts.save(id, recipe)
	return c.json({ message: 'Recipe saved' })
})

export default router
