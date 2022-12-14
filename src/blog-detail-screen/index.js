import {Link, useNavigate, useSearchParams} from "react-router-dom";
import CommentArea from "../detail-screen/comment-area";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteABlogThunk, findBlogByBlogIDThunk} from "../services/blog-thunk";
import {COINGECKO_API_BASE_URL} from "../util/global-variables";


const BlogScreen = () => {
    const {currentUser} = useSelector(state => state.users);
    const {curBlog, fetching} = useSelector(state => state.blogs);

    let [searchParams] = useSearchParams();
    const blogID = searchParams.get("blogID");

    const [isLoaded, setIsLoaded] = useState(false);
    const [coin, setCoin] = useState(null);

    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch(findBlogByBlogIDThunk(blogID));
        },
        []
    )

    // fetch the coin data if curBlog is not null, or curBlog changed
    useEffect(
        () => {
            curBlog && fetch(`${COINGECKO_API_BASE_URL}/${curBlog.coinID}`)
                .then(res => res.json())
                .then((result) => {
                        setIsLoaded(true);
                        setCoin(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        console.log(error)
                    }
                )
        },
        [curBlog]
    )


    const navigate = useNavigate();
    function deleteBlogHandler(blogID) {
        dispatch(deleteABlogThunk(blogID))
        navigate('/bloglist');
    }

    const percentFormat = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

    function handleEditClick(e) {
        e.preventDefault();

        if (!currentUser) {
            alert('Please login before edit a blog.')

        } else if (currentUser._id !== curBlog.authorID._id) {
            alert("Only writer could edit the blog.")

        } else (
            navigate('/blog-edit/Edit')
        )
    }


    if (fetching || !curBlog) {
        return (
            <h1>Loading....</h1>
        )
    }

    return(
        <div className="d-xxl-flex d-xl-flex d-lg-flex mt-3">
            <div className={"col-xxl-9 col-xl-8 col-lg-8 col-12 ps-5 pe-3 border-end d-flex justify-content-center"}>
                <div className={"col-xxl-7 col-xl-10 col-lg-11 col-md-8 col-sm-9 col-12"}>
                    <h1 className={"mb-4"}>{curBlog.title}</h1>
                    <div id={"additional information"} className={"d-flex mb-2"}>
                        <Link to={`/profile/${curBlog.authorID._id}`} className={""}>
                            <img className="wd-rounded-image" width={"32px"} height={"32px"} src={`/images/p${curBlog.authorID.avatar}.jpg`}
                                 alt="avatar" />
                        </Link>
                        <div className="mt-1 ms-2">
                            <h6 className="">{curBlog.authorID.firstName} {curBlog.authorID.lastName}</h6>
                        </div>
                        {
                            isLoaded &&
                            <div className={"ms-auto d-flex"}>
                                <Link to={{ pathname: '../detail',
                                    search: "coinID="+curBlog.coinID}}>
                                    <img className={""} src={coin.image.large} width={"32px"} height={"32px"} alt={"The icon of this coin"}/>
                                </Link>
                                <div className={"ms-1 mt-1"}>
                                    {coin.symbol.toUpperCase()}
                                </div>
                                <div className={`mt-1 ms-3 ${coin.market_data.price_change_percentage_24h > 0 ?
                                    'text-success' : ''
                                    || coin.market_data.price_change_percentage_24h < 0 ?
                                        'text-danger' : ''
                                        || coin.percentChange === 0 ?
                                            'text-secondary' : ''}`}>
                                    {coin.market_data.price_change_percentage_24h > 0 ? '+' : ''}
                                    {percentFormat.format(coin.market_data.price_change_percentage_24h / 100)}
                                </div>
                            </div>
                        }
                    </div>
                    <div className={"wd-paragraph-fine-wrapped"} >{curBlog.content}</div>
                    <div className={"mt-4 d-flex"}>
                        {
                            currentUser && (currentUser._id === curBlog.authorID._id)
                            &&
                            <button type={"button"} className={"btn wd-btn-lowlight me-2"} onClick={(e) => handleEditClick(e)}>
                                Edit
                            </button>
                        }
                        {
                            currentUser && (currentUser.role === "ADMIN" || currentUser._id === curBlog.authorID._id)
                            &&
                            <button type={"submit"} className={"btn btn-danger"}
                                    onClick={() => deleteBlogHandler(curBlog._id)}>
                                Delete Blog
                            </button>
                        }
                    </div>
                </div>

            </div>
            <div className={"col-xxl-3 col-xl-4 col-lg-4 col-12 d-flex justify-content-center"}>
                <div className={"col-lg-12 col-md-6 col-sm-6 col-10 mt-xxl-0 mt-xl-0 mt-lg-0 mt-md-3 mt-sm-3 mt-3"}>
                    <CommentArea objectType={"Blog"}/>
                </div>
            </div>

        </div>

    )


}

export default BlogScreen;