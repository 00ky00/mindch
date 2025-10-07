import { defineEventHandler, readBody } from 'h3';
import { pool as db } from '../utils/db';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log('Request body:', body); // リクエストボディをログに記録

    const { title } = body;

    if (!title) {
        return { result: 'error', message: 'タイトルは必須です。' };
    }

    try {
        const query = `INSERT INTO threads (title) VALUES ($1) RETURNING *`;
        console.log('Executing query:', query, 'with params:', [title]); // クエリとパラメータをログに記録

        const result = await db.query(query, [title]);
        console.log('Query result:', result); // クエリ結果をログに記録

        return { result: 'success', thread: result.rows[0] };
    } catch (error) {
        console.error('Error inserting thread:', error);

        // エラーを型アサーションで Error 型として扱う
        const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました';
        return { result: 'error', message: 'スレッドの作成に失敗しました。', error: errorMessage };
    }
});