/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import PostItem from '../PostItem'
import { RootState, useAppDispatch } from '~/store'
import { deletePost, getPostList, startEditingPost } from '../../blog.reducer'
import SkeletonPost from '../SkeletonLoadingPost/SkeletonPost'

export default function PostList() {
  const postList = useSelector((state: RootState) => state.blog.postlist)
  const loading = useSelector((state: RootState) => state.blog.loading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const promise = dispatch(getPostList())

    return () => {
      promise.abort()
    }
  }, [dispatch])

  // handle function

  const handleDelete = (postId: string) => {
    dispatch(deletePost(postId))
  }

  const handleStartEditingPost = (postId: string) => {
    dispatch(startEditingPost(postId))
  }

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>
            Rich Vlog
          </h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Tôi không bao giờ bỏ cuộc. Tôi sẽ làm đến cùng và thành công.
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {loading && (
            <Fragment>
              <SkeletonPost />
              <SkeletonPost />
              <SkeletonPost />
              <SkeletonPost />
            </Fragment>
          )}
          {!loading &&
            postList.map((post) => (
              <PostItem
                data={post}
                key={post.id}
                handleDelete={handleDelete}
                handleStartEditingPost={handleStartEditingPost}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
