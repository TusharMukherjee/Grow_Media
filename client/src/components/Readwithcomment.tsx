import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { getComm } from ''
import { useSelector } from 'react-redux';
import { getComm, getOwnerInfo, postOwnerInfo } from "../features/PostSlice";
import { useMutation, useQuery } from "@apollo/client";
import { COMMENT, FOLLOW, REPLY_COMMENTS, UNFOLLOW } from "../gqlQueries/mutations/Allmutation";
import { userLoginInfo } from "../features/UserSlice";
import { IS_FOLLOWING } from "../gqlQueries/queries/Explorequery";



type bcomments = {
        bcomment_id: string;
        blcomment:string;
        totalBlogComments: number
        replyComments:{
          rcomment_id:string;
          replied_comment:string;
          replyUsers:{
            user_id: string;
            profile_img: string;
            username: string;
          }[];
        }[];
        blogsComUsers: {
          user_id: string;
          profile_img: string;
          username: string;
        }[];
}

type users = {
    user_id: string;
    username: string;
    bio: string | null;
}

type b_comments = {
        users:users[]
}

type refetchMut = {
    refetch_isFollowing:()=> any,
    refetchMut: () => any,
    isFollow: {
        isFollowing:{
            status: boolean
        }
    }|undefined
}
type isFollow = {
    isFollow: {
        isFollowing:{
            status: Boolean
        }
    }
}

const Readwithcomment = ({refetch_isFollowing,refetchMut, isFollow}:refetchMut) => {
    // const Readwithcomment = (props: b_comments)
    const param = useParams();
    const commSelector:bcomments[] = useSelector(getComm);
    const ownerInfoSelector: b_comments = useSelector(getOwnerInfo);
    const selector = useSelector(userLoginInfo);
    console.log(selector);
    // console.log(ownerInfoSelector.users[0].user_id);
    console.log(commSelector);
    // const [commInfo, setcommInfo] = useState<bcomments[] | undefined>();
    // const [ownerInfo, setownerInfo] = useState<users[]>();
    const [toggleReply, setToggleReply] = useState<any>(null);
    const [createComment, setCreateComment] = useState("");
    const [replyComment, setReplyComment] = useState("");

    console.log(isFollow?.isFollowing.status);

    // const {data,refetch} = useQuery(IS_FOLLOWING,{
    //     onCompleted:()=>{
    //         console.log(data);
    //     },
    //     variables:{
    //         userId:selector.user_id,
    //         followersId: ownerInfoSelector.users[0].user_id
    //     }
    // });

    // useEffect(()=>{
        
    // },[isFollow]);

    const [commentFun] = useMutation(COMMENT,{ 
        onCompleted:() => {
            refetchMut();
        },
        variables:{
            userId: selector.user_id,
            blogId: param.blog_id,
            commentContent: createComment
        }
    })
    const [replyFun] = useMutation(REPLY_COMMENTS,{
        onCompleted:() => {
            refetchMut();
        }
    });

    const [followFun] = useMutation(FOLLOW,{
        onCompleted:(data) => {
            console.log(data);
            refetch_isFollowing();
        }
    });

    const [unfollowFun] = useMutation(UNFOLLOW,{
        onCompleted:(data) => {
            console.log(data);
            refetch_isFollowing();
        }
    })

    useEffect(()=>{
        setCreateComment("");
        setReplyComment("");
    },[commSelector])

    // useEffect(()=>{
    //     if(props.bcomments != undefined){
    //         setcommInfo(props.bcomments);
    //         setownerInfo(props.users);            
    //     }        
    // },[props]);


    function toggleRepButton (index:number){
        if(toggleReply === index){
            return setToggleReply(null);
        }
        setToggleReply(index);
    }


  return (
      <div className='sticky flex flex-col items-center'>
            <div className='flex flex-col items-center'>
            <div className=' h-auto w-80 flex flex-col bg-white rounded-md'>
                <div className='flex flex-row items-center p-4'>
                    <div className='bg-teal-900 h-20 w-20 rounded-md'></div>
                    <div className='flex flex-col'>
                    <h1 className='pl-4'><Link to= {`/profile/${ownerInfoSelector.users[0].user_id}`}>{ownerInfoSelector.users[0].username}</Link></h1>
                    <p className='pl-4'>10K Followers</p> 
                    </div>
                </div>
                <p className='px-4 pb-4'>{ownerInfoSelector.users[0].bio == null? '' : ownerInfoSelector.users[0].bio}</p>
                {
                    (Number(ownerInfoSelector.users[0].user_id) === Number(selector.user_id))
                    ?
                    <></>
                    :
                    (isFollow?.isFollowing.status)
                    ?
                    <div className='pl-4 pb-4'>
                        <button onClick={() => unfollowFun({variables:{userId:selector.user_id, followersId:ownerInfoSelector.users[0].user_id}})} className=' bg-white border-2 border-teal-500 text-teal-500 px-2 py-1 rounded-md'>Unfollow</button> 
                    </div>
                    :
                    <div className='pl-4 pb-4'>
                        <button onClick={() => followFun({variables:{userId:selector.user_id, followersId:ownerInfoSelector.users[0].user_id}})} className=' bg-teal-500 text-white px-2 py-1 rounded-md'>Follow</button> 
                    </div>
                }
            </div>

            <div className=' w-80 my-5 py-1 px-2 rounded-md'>
                <div className='grid grid-cols-2 gap-3'>
                    <button className=' rounded-md py-1 px-2 col-span-1 bg-white'>
                        80 Likes
                    </button>
                    <button className=' rounded-md py-1 px-2 col-span-1 bg-white'>
                        {commSelector.length} Comm.
                    </button>
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <div className='flex flex-col items-center mb-4'>
                    <textarea placeholder="Comment" value={createComment} onChange={(e) => {setCreateComment(e.target.value)}} className=' w-80 rounded-t-md resize-none mx-4 mt-4 outline-0 p-4'></textarea>
                    <div className='flex flex-row bg-white w-80 justify-end py-2  rounded-b-md'>
                        <button onClick={()=>commentFun()} className='mr-4 px-2 py-1 bg-teal-500 rounded-md text-white'>Reply</button>
                    </div>
                </div>

                {
                    commSelector.map((el,index) => {
                        return(
                        
                            <div className='w-80 my-2 rounded-md bg-white flex flex-col justify-center' key={el.bcomment_id}>
                                <div className='flex flex-row p-4'>
                                    <div className=' rounded-full h-6 w-6 bg-stone-700'></div>
                                    <div className='ml-4'>
                                        <h1>{el.blogsComUsers[0].username}</h1>
                                    </div>
                                </div>
                                <div className='px-4 pb-4'>
                                    <p className='w-72'>{el.blcomment}</p>
                                </div>
                                <div className='px-4 pb-4'>
                                    <button className='px-2 py-1 rounded-md bg-teal-500 text-white'>{el.totalBlogComments} Likes</button>
                                    <button className='px-2 py-1 ml-3 rounded-md bg-teal-500 text-white' onClick={() => toggleRepButton(index)} >{el.replyComments.length} Reply</button>
                                </div>

                                
                                {/* reply cmnt */}
                                        <>
                                            <div className=' items-center flex-row bg-white rounded-b-md grid grid-cols-8'>
                                                { toggleReply === index ? (<>
                                                            <div className="flex flex-col col-span-8">
                                                                <div className='flex flex-col items-center mb-4 bg-white'>
                                                                    <textarea value={replyComment} onChange={(e)=>{setReplyComment(e.target.value)}} className=' w-72  border-t-[0.5px] border-x-[0.5px] border-teal-500 rounded-t-md resize-none mx-4 mt-4 outline-0 p-4' rows={1}></textarea>
                                                                    <div className=' w-72 border-b-[0.5px] border-x-[0.5px] border-teal-500 flex flex-row bg-white justify-end py-2  rounded-b-md'>
                                                                        <button onClick={()=>{replyFun({variables:{userId: selector.user_id,parentCommentId:el.bcomment_id, commentContent:replyComment}})}} className='mr-4 px-2 py-1 bg-teal-500 rounded-md text-white'>Reply</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div id = 'subReplies' className='  items-center col-start-2 col-span-6'>
                                                            {
                                                                el.replyComments.map((allrep) => {
                                                                    return(
                                                                        <div className=" bg-white my-4" key={allrep.rcomment_id}>
                                                                            {allrep.replyUsers.map((replyUser) => {
                                                                                return(
                                                                                    <div className="flex flex-row items-center bg-white" key={replyUser.user_id}>
                                                                                        <div className='rounded-full h-5 w-5 bg-stone-700'></div>
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
