/* eslint-disable prettier/prettier */
// library
import {
  AsyncThunk,
  PayloadAction,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'

//types
import { Post } from '~/@types/blog.type'

// components
import { initialPostList } from '~/contains/blog'
import http from '~/utils/http'

interface BlogState {
  postlist: Post[]
  editingPost: Post | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: BlogState = {
  postlist: [],
  editingPost: null,
  loading: false,
  currentRequestId: undefined
}

// // actions
// export const addPost = createAction(
//   'blog/addPost',
//   function (post: Omit<Post, 'id'>) {
//     return {
//       payload: {
//         ...post,
//         id: nanoid()
//       }
//     }
//   }
// )
// export const deletePost = createAction<string>('blog/deletePost')
// export const startEditingPost = createAction<string>('blog/startEditingPost')
// export const cancelEditingPost = createAction('blog/cancelPost')
// export const finishedEditingPost = createAction<Post>(
//   'blog/finishedEditingPost'
// )

// const blogReducer = createReducer(intialState, (buidler) => {
//   buidler
//     .addCase(addPost, (state, action) => {
//       const newPost = action.payload
//       state.postlist.push(newPost)
//     })
//     .addCase(deletePost, (state, action) => {
//       const postId = action.payload
//       const foundId = state.postlist.findIndex((post) => post.id === postId)
//       if (foundId !== -1) {
//         state.postlist.splice(foundId, 1)
//       }
//     })
//     .addCase(startEditingPost, (state, action) => {
//       const postId = action.payload
//       const foundId = state.postlist.find((post) => post.id === postId) || null
//       state.editingPost = foundId
//     })
//     .addCase(cancelEditingPost, (state) => {
//       state.editingPost = null
//     })
//     .addCase(finishedEditingPost, (state, action) => {
//       const postId = action.payload.id
//       state.postlist.some((post, index) => {
//         if (post.id === postId) {
//           state.postlist[index] = action.payload
//           return true
//         }
//         return false
//       })
//       state.editingPost = null
//     })
//     .addMatcher(
//       (action) => action.type.includes('cancel'),
//       (state) => {
//         console.log(current(state))
//       }
//     )
//     .addDefaultCase((state) => {
//       new Error('Error')
//     })
// })

// asyncThunk dung de tao pending cho loading
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

// createAsyncThunk
export const getPostList = createAsyncThunk(
  'blog/getPostList',
  async (_, thunkApi) => {
    const response = await http.get<Post[]>('Posts', {
      signal: thunkApi.signal
    })
    return response.data
  }
)

export const addPost = createAsyncThunk(
  'blog/addPost',
  async (body: Omit<Post, 'id'>, thunkApi) => {
    try {
      const response = await http.post<Post>('Posts', body, {
        signal: thunkApi.signal
      })
      return response.data
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return thunkApi.rejectWithValue(error.response.data)
      }
      throw error
    }
  }
)

// Note: trong json-server đã tự trả về id rồi.

export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ postId, body }: { postId: string; body: Post }, thunkApi) => {
    try {
      const response = await http.put<Post>(`Posts/${postId}`, body, {
        signal: thunkApi.signal
      })
      return response.data
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return thunkApi.rejectWithValue(error.response.data)
      }
      throw error
    }
  }
)

export const deletePost = createAsyncThunk(
  'blog/deletePost',
  async (postId: string, thunkApi) => {
    const response = await http.delete<Post>(`Posts/${postId}`, {
      signal: thunkApi.signal
    })
    return response.data
  }
)

// createSlice
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditingPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundId = state.postlist.find((post) => post.id === postId) || null
      state.editingPost = foundId
    },
    cancelEditingPost: (state) => {
      state.editingPost = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action: any) => {
        console.log(action.payload)
        state.postlist = action.payload
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postlist.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postlist.find((post, index) => {
          if (post.id === action.payload.id) {
            state.postlist[index] = action.payload
            return true
          }
          return false
        })
        state.editingPost = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.meta.arg
        const foundId = state.postlist.findIndex((post) => post.id === id)
        if (foundId !== -1) {
          state.postlist.splice(foundId, 1)
        }
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.currentRequestId = action.meta.requestId
          state.loading = true
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) =>
          action.type.endsWith('/rejected') ||
          action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (
            state.loading &&
            state.currentRequestId === action.meta.requestId
          ) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )

      .addDefaultCase((state) => {
        new Error('Error')
      })
  }
})

const blogReducer = blogSlice.reducer

export const { startEditingPost, cancelEditingPost } = blogSlice.actions

export default blogReducer
