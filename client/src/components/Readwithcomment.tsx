import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from "@apollo/client";
import { LIKEBLOG, UNLIKEBLOG, COMMENT, FOLLOW, LIKECMNT, REPLY_COMMENTS, UNFOLLOW, UNLIKECMNT } from "../gqlQueries/mutations/Allmutation";
import { userLoginInfo } from "../features/UserSlice";
import { BLOGS_LIKES } from "../gqlQueries/queries/Explorequery";

type refetchMut = {
    is_liked: {
        onlycomments: onlycomments[] | undefined
    } | undefined
    data_onlyblog: data_onlyblog
    repTOTAL: repTOTAL,
    onlyCMNT : onlyCMNT,
    refetch_total:()=>any,
    refetch_isFollowing:()=> any,
    refetchMut: () => any,
    refetch_isliked:() => any,
    refetch_followers:()=> any,
    data_followers: {
        followers:{
            followers: number
        }[]
    }
    isFollow: {
        isFollowing:{
            status: boolean
        }
    }|undefined
}

type onlyCMNT = {
    onlycomments: [onlycomments]
}

type onlycomments = {
    bcomment_id:string,
    blcomment:string,
    blogsComUsers:[blogsComUsers],
    replyComments:[replyComments],
    bcommentLikesb:[bcommentLikesb]
}

type blogsComUsers = {
    user_id: string,
    profile_img: string,
    username: string,
    bio: string,
}

type replyComments = {
    rcomment_id: string,
    replied_comment:string,
    replyUsers:[replyUsers]
}

type replyUsers = {
    user_id: string,
    profile_img:  string,
    username: string
}

type bcommentLikesb = {
    bluser_id: string | undefined
} 

type repTOTAL = {
    totalcomment: [totalcomment] | undefined
} 

type totalcomment = {
    bcomments: totallikedcmnt[] 
} 

type totallikedcmnt = {
    totalBlogComments: number 
}

type data_onlyblog = {
    blog: [blog]
} | undefined

type blog = {
    blog_id: string
    bluser_id: string
    b_image: string
    heading: string
    content: string
    users: [data_onlyblog_users]
}

type data_onlyblog_users = {
    user_id: string
    profile_img: string
    username: string
    bio: string
}

const Readwithcomment = ({data_followers,refetch_followers,refetch_total,is_liked,refetch_isliked ,data_onlyblog,repTOTAL,onlyCMNT,refetch_isFollowing,refetchMut, isFollow}:refetchMut) => {
    
    const param = useParams();
    const selector = useSelector(userLoginInfo);

    // console.log(repTOTAL?.totalcomment?.[0].bcomments);
    // console.log(is_liked?.onlycomments[1].bcommentLikesb[0]?.bluser_id); alt=

    const [toggleReply, setToggleReply] = useState<any>(null);
    const [createComment, setCreateComment] = useState("");
    const [replyComment, setReplyComment] = useState("");

    const{data:data_blikes, refetch:refetch_blikes} = useQuery(BLOGS_LIKES,{
        variables:{
            blogId: param.blog_id,
            userId: selector.user_id
        }
    });

    // Likeblog -------------------------------------------

    const[likeblogFun] = useMutation(LIKEBLOG,{
        onCompleted:() => {
            refetch_blikes();
        },
        variables:{
            userId: Number(selector.user_id),
            blogId: Number(param.blog_id),
        }
    });

    // Unlikeblog -----------------------------------------

    const[unlikeblogFun] = useMutation(UNLIKEBLOG,{
        onCompleted:() => {
            refetch_blikes();
        },
        variables:{
            userId: Number(selector.user_id),
            blogId: Number(param.blog_id),
        }
    });

    // Comment related functions --------------------------

    const [commentFun] = useMutation(COMMENT,{ 
        onCompleted:() => {
            setCreateComment("");
            refetchMut();
        },
        variables:{
            userId: selector.user_id,
            blogId: param.blog_id,
            commentContent: createComment.trim()
        }
    })
    const [replyFun] = useMutation(REPLY_COMMENTS,{
        onCompleted:() => {
            setReplyComment("");
            refetchMut();
        }
    });

    // Follow related functions -------------------------------

    const [followFun] = useMutation(FOLLOW,{
        onCompleted:(data) => {
            // console.log(data);
            refetch_isFollowing();
            refetch_followers();
        }
    });

    const [unfollowFun] = useMutation(UNFOLLOW,{
        onCompleted:(data) => {
            // console.log(data);
            refetch_isFollowing();
            refetch_followers();
        }
    })


    // Like Comment rellated function ---------------

    const [likecmntFun] = useMutation(LIKECMNT,{
        onCompleted:() =>{
            refetch_isliked();
            refetch_total();
            // refetch is this cmnt liked by logged in user
        }
    })

    const [unlikecmntFun] = useMutation(UNLIKECMNT,{
        onCompleted:() => {
            refetch_isliked();
            refetch_total();
            // refetch is this unliked?
        }
    })


    function toggleRepButton (index:number){
        if(toggleReply === index){
            return setToggleReply(null);
        }
        setToggleReply(index);
    }


  return (
      <div className='sm:mb-40 mb-20 sticky flex flex-col items-center'>
            <div className='flex flex-col items-center'>
            <div className=' h-auto w-80 flex flex-col bg-white rounded-md'>
                <div className='flex flex-row items-center p-4'>
                    {
                        (data_onlyblog?.blog[0]?.users[0]?.profile_img !== null)?
                        <img src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1652613376/${data_onlyblog?.blog[0]?.users[0]?.profile_img}`} alt={data_onlyblog?.blog[0]?.users[0]?.profile_img} className='h-20 w-20 rounded-md'/>
                        :
                        <img src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1656086069/e0gy9inebvobnauo1um2.gif`} alt="Default img (Grow_Media)" className='h-20 w-20 rounded-md'/>
                    }
                    <div className='flex flex-col'>
                    <h1 className='pl-4'><Link to= {`/profile/${data_onlyblog?.blog[0].users[0].user_id}`}>{data_onlyblog?.blog[0].users[0].username}</Link></h1>
                    <p className='pl-4'>{data_followers?.followers[0]?.followers} Followers</p> 
                    </div>
                </div>
                <p className='px-4 pb-4'>{(data_onlyblog?.blog[0].users[0].bio == null)? '' : data_onlyblog?.blog[0].users[0].bio}</p>
                {
                    (Number(data_onlyblog?.blog[0].users[0].user_id) === Number(selector.user_id))
                    ?
                    <></>
                    :
                    (isFollow?.isFollowing.status)
                    ?
                    <div className='pl-4 pb-4'>
                        <button onClick={() => unfollowFun({variables:{userId:selector.user_id, followersId:data_onlyblog?.blog[0].users[0].user_id}})} className=' bg-white border-2 border-teal-500 text-teal-500 px-2 py-1 rounded-md'>Unfollow</button> 
                    </div>
                    :
                    <div className='pl-4 pb-4'>
                        <button onClick={() => followFun({variables:{userId:selector.user_id, followersId:data_onlyblog?.blog[0].users[0].user_id}})} className=' bg-teal-500 text-white px-2 py-1 rounded-md'>Follow</button> 
                    </div>
                }
            </div>

            <div className=' w-80 my-5 py-1 px-2 rounded-md'>
                <div className='grid grid-cols-2 gap-3'>
                    {
                        (data_blikes?.likeblogs[0]?.islikedbyuser === selector.user_id)
                        ?
                        <button onClick={()=>unlikeblogFun()} className=' bg-teal-500 rounded-md py-1 px-2 col-span-1 text-white'>
                            {data_blikes?.likeblogs[0]?.totalblikes} Likes
                        </button>
                        :
                        <button onClick={()=>likeblogFun()} className=' rounded-md py-1 px-2 col-span-1 bg-white'>
                            {data_blikes?.likeblogs[0]?.totalblikes} Likes
                        </button>
                    }
                    <div className=' rounded-md text-center py-1 px-2 col-span-1 bg-white'>
                        {onlyCMNT?.onlycomments.length} Comm.
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <div className='flex flex-col items-center mb-4'>
                    <textarea onKeyDownCapture={(e) => e.key === 'Enter' && (createComment.trim()!=="")?commentFun():null} placeholder="Comment" value={createComment} onChange={(e) => {setCreateComment(e.target.value)}} className=' w-80 rounded-t-md resize-none mx-4 mt-4 outline-0 p-4'></textarea>
                    <div className='flex flex-row bg-white w-80 justify-end py-2  rounded-b-md'>
                        <button onClick={()=>(createComment.trim()!=="")?commentFun():null} className='mr-4 px-2 py-1 bg-teal-500 rounded-md text-white'>Reply</button>
                    </div>
                </div>

                {
                    onlyCMNT?.onlycomments.map((el,index) => {
                        return(
                        
                            <div className='w-80 my-2 rounded-md bg-white flex flex-col justify-center' key={el?.bcomment_id}>
                                <div className='flex flex-row p-4'>
                                    {(el.blogsComUsers[0].profile_img !== null)?
                                        <img src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1652613376/${el.blogsComUsers[0].profile_img}`} alt={el.blogsComUsers[0].profile_img} className=' rounded-full h-6 w-6 '/>
                                        :
                                        <img src="https://res.cloudinary.com/dmtfoyuuq/image/upload/v1656086069/e0gy9inebvobnauo1um2.gif" alt={el.blogsComUsers[0].profile_img} className=' rounded-full h-6 w-6 '/>
                                    }
                                    
                                    <div className='ml-4'>
                                        <h1>{el?.blogsComUsers[0].username}</h1>
                                    </div>
                                </div>
                                <div className='px-4 pb-4'>
                                    <p className='w-72'>{el?.blcomment}</p>
                                </div>
                                <div className='px-4 pb-4'>
                                    {
                                        (Number(is_liked?.onlycomments?.[index]?.bcommentLikesb[0]?.bluser_id) === selector.user_id)
                                        ?
                                        <button onClick={()=>unlikecmntFun({variables:{userId: selector.user_id, bcommentIdLike: el?.bcomment_id}})} className='px-2 py-1 rounded-md bg-teal-500 text-white'>{repTOTAL?.totalcomment?.[0]?.bcomments?.[index]?.totalBlogComments} Likes</button>
                                        :
                                        <button onClick={()=>likecmntFun({variables:{userId: selector.user_id, bcommentIdLike: el?.bcomment_id}})} className='px-2 py-1 rounded-md border-2 border-teal-500 bg-white text-teal-500'>{repTOTAL?.totalcomment?.[0]?.bcomments?.[index]?.totalBlogComments} Likes</button>
                                    }
                                    
                                    <button className='px-2 py-1 ml-3 rounded-md bg-teal-500 text-white' onClick={() => toggleRepButton(index)} >{el?.replyComments.length} Reply</button>
                                </div>

                                
                                {/* reply cmnt */}
                                        <>
                                            <div className=' items-center flex-row bg-white rounded-b-md grid grid-cols-8'>
                                                { toggleReply === index ? (<>
                                                            <div className="flex flex-col col-span-8">
                                                                <div className='flex flex-col items-center mb-4 bg-white'>
                                                                    <textarea onKeyDownCapture={(e) => e.key === 'Enter' && (replyComment.trim()!=="")? replyFun({variables:{userId: selector.user_id,parentCommentId:el?.bcomment_id, commentContent: replyComment.trim()}}):null} value={replyComment} onChange={(e)=>{setReplyComment(e.target.value)}} className=' w-72  border-t-[0.5px] border-x-[0.5px] border-teal-500 rounded-t-md resize-none mx-4 mt-4 outline-0 p-4' rows={1}></textarea>
                                                                    <div className=' w-72 border-b-[0.5px] border-x-[0.5px] border-teal-500 flex flex-row bg-white justify-end py-2  rounded-b-md'>
                                                                        <button onClick={()=>(replyComment.trim()!=="")? replyFun({variables:{userId: selector.user_id,parentCommentId:el?.bcomment_id, commentContent: replyComment.trim()}}):null} className='mr-4 px-2 py-1 bg-teal-500 rounded-md text-white'>Reply</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div id = 'subReplies' className='  items-center col-start-2 col-span-6'>
                                                            {
                                                                el?.replyComments.map((allrep) => {
                                                                    return(
                                                                        <div className=" bg-white my-4" key={allrep.rcomment_id}>
                                                                            {allrep.replyUsers.map((replyUser) => {
                                                                                return(
                                                                                    <div className="flex flex-row items-center bg-white" key={replyUser.user_id}>
                                                                                        {
                                                                                            (replyUser.profile_img !== null)?
                                                                                            <img src={`https://res.cloudinary.com/dmtfoyuuq/image/upload/v1652613376/${replyUser.profile_img}`} alt={replyUser.profile_img} className='rounded-full h-5 w-5 '/>
                                                                                            :
                                                                                            <img src="https://res.cloudinary.com/dmtfoyuuq/image/upload/v1656086069/e0gy9inebvobnauo1um2.gif" alt="Default img (Grow_Media)" className='rounded-full h-5 w-5 '/>
                                                                                        }
                                                                                        
                                                                                        <h1 className='ml-2 text-base'>{replyUser.username}</h1>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        <div className='py-2'>
                                                                            {
                                                                                <p className=' text-sm pr-4 w-64'>{allrep.replied_comment}</p>
                                                                            }
                                                                        </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                </div></>) : (null)}
                                            </div>
                                        </>
                                
                            </div>
                        )
                    })
                }
                
            </div>
            
        </div>
      </div>
    
  )
}

export default Readwithcomment
