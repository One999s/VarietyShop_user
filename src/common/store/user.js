import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ 
	  count: 0 ,
  }),
  actions: {
    increment() {
      this.count++
    },
  },
  getters: {
      // doubleCount: (state) => state.counter * 2,
    },
}) 