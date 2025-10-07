<template>
  <div class="thread-creation">
    <h1>マインドを作成</h1>
    <form @submit.prevent="createThread">
      <div class="form-group">
        <label for="title">タイトル</label>
        <input
          type="text"
          id="title"
          v-model="title"
          placeholder="タイトルを入力してください"
          required
        />
      </div>
      <button type="submit">作成</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { response } from '@/data/mkthreads';

const title = ref('');

const createThread = async () => {
  if (title.value) {
    try {
      // ラッパー関数を使用してスレッドを作成
      const result = await response(title.value);

      if (result.result === 'success') {
        alert(`スレッド「${title.value}」が作成されました！`);
        title.value = ''; // 入力フィールドをリセット
      } else {
        alert('スレッドの作成に失敗しました。');
      }
    } catch (error) {
      console.error('API呼び出しエラー:', error);
      alert('エラーが発生しました。');
    }
  } else {
    alert('タイトルを入力してください。');
  }
};
</script>

<style scoped>
.thread-creation {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>