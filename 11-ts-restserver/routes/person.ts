import { Router } from 'express';
import { personDeleteById, personGetById, personPost, personPut, personsGet } from '../controllers/person';

const router = Router();

router.get('/', personsGet);
router.get('/:id', personGetById);
router.post('/', personPost);
router.put('/:id', personPut);
router.delete('/:id', personDeleteById);

export default router;