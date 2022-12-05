import WatchListTable from "../watchlist-table/watchlist-table";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import PostList from "./posts/post-list";
import {useDispatch, useSelector} from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {findUserByIdThunk} from "../services/users-thunks";
import {findUsersFollowedByUserThunk, findUsersFollowingUserThunk} from "../services/follow-thunks";

// https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');

    //Check if the input is of correct
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        //Remove the matched extension code
        //Change this to format for any country code.
        let intlCode = (match[1] ? `+${match[1]} ` : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null;
}

const Profile = () => {
    const {currentUser} = useSelector(state => state.users);  // TODO: just keep this one?
    const {followers, following} = useSelector(state => state.follow)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(findUsersFollowingUserThunk(currentUser._id))
        dispatch(findUsersFollowedByUserThunk(currentUser._id))
    }, [])
    return (
        <div className={'row'}>
            <div className="col-xl-3 col-lg-4 col-md-5 mt-2">
                <div className="card">
                    <div className="card-img-top position-relative">
                        <img src={`/images/b${currentUser.banner}.jpg`}
                             className="card-img-top" alt="..."/>
                        <img className="position-absolute rounded-circle img-thumbnail"
                             style={{
                                 'height': '85%',
                                 'width': '50%',
                                 'bottom': '5%',
                                 'left': '25%'
                             }}
                             src={`/images/p${currentUser.avatar}.jpg`} alt=""/>
                    </div>
                    <div className="card-body">
                        <div className="card-title fw-bold fs-5">
                            {currentUser.firstName} {currentUser.lastName}
                            <span className="fw-light text-secondary fs-6 ps-2">
                                @{currentUser.handle}
                            </span>
                        </div>
                        <p className="card-text">
                            <div className={'row'}>
                                <div className={'col'}>
                                    <span
                                        className={'fw-bold pe-2'}>{followers.length}</span>
                                    <span className={'text-secondary'}>Followers</span>
                                </div>
                                <div className={'col'}>
                                    <span
                                        className={'fw-bold pe-2'}>{following.length}</span>
                                    <span className={'text-secondary'}>Following</span>
                                </div>
                            </div>
                            <div className={'pt-2'}>
                                {currentUser.bio}
                            </div>
                            <div className={'pt-2'}>
                                <i className={'bi bi-geo-fill pe-2'}></i>
                                {currentUser.city}
                            </div>
                            <div className={'pt-2'}>
                                <i className={'bi bi-globe pe-2'}></i>
                                <a href={`https://www.${currentUser.website}`}
                                   style={{textDecorationLine: 'none'}}>
                                    {currentUser.website}
                                </a>
                            </div>
                            <div className={'pt-2'}>
                                <i className={'bi bi-balloon-fill pe-2'}></i>
                                {currentUser.birthday}
                            </div>
                            <div className={'pt-2'}>
                                <i className={'bi bi-telephone-fill pe-2'}></i>
                                {formatPhoneNumber(currentUser.phoneNumber)}
                            </div>
                            <div className={'pt-2'}>
                                <i className={'bi bi-house-fill pe-2'}></i>
                                {currentUser.address}
                            </div>
                            <div className={'pt-2'}>
                                <i className={'bi bi-person-square pe-2'}></i>
                                {currentUser.type}
                            </div>
                        </p>

                    </div>
                </div>
                <div className={'text-center pt-3'}>
                    <Link to={'/edit-profile'}>
                        <button className={'btn btn-warning w-100'}>
                            Edit Profile
                        </button>
                    </Link>
                </div>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7 col-sm mt-2">
                <Tabs defaultActiveKey="first" variant={'pills'} fill={true}>
                    <Tab tabClassName={'wd-profile-tabs'}
                         eventKey="first" title="Watchlist">
                        <WatchListTable uid={currentUser._id} allowedToRemove={true}/>
                    </Tab>
                    <Tab tabClassName={'wd-profile-tabs'}
                         eventKey="second" title="Comments">
                        <PostList/>
                    </Tab>
                    <Tab tabClassName={'wd-profile-tabs'}
                         eventKey="third" title="Reactions">
                        Likes/Dislikes
                    </Tab>
                    <Tab tabClassName={'wd-profile-tabs'}
                         eventKey="fourth" title="Followers">
                        <div className='list-group'>
                            {
                                followers &&
                                followers.map(follow =>
                                                  <Link to={`/profile/${follow.follower._id}`}
                                                        className='list-group-item'>
                                                      <div className='row'>
                                                          <div className='col-1'>
                                                              <img src={`/images/p${follow.follower.avatar}.jpg`}
                                                                   alt=""
                                                                   className='rounded-circle pt-2 w-100'/>
                                                          </div>
                                                          <div className='col pt-2 fs-3 fw-bold'>
                                                              {follow.follower.firstName} {follow.follower.lastName}
                                                              <div className='fs-5 text-secondary fw-normal'>
                                                                  @{follow.follower.handle}
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </Link>
                                )
                            }
                        </div>
                    </Tab>
                    <Tab tabClassName={'wd-profile-tabs'}
                         eventKey="fifth" title="Following">
                        <div className='list-group'>
                            {
                                following &&
                                following.map(follow =>
                                                  <Link to={`/profile/${follow.followee._id}`}
                                                        className='list-group-item'>
                                                      <div className='row'>
                                                          <div className='col-1'>
                                                              <img src={`/images/p${follow.followee.avatar}.jpg`}
                                                                   alt=""
                                                                   className='rounded-circle pt-2 w-100'/>
                                                          </div>
                                                          <div className='col pt-2 fs-3 fw-bold'>
                                                              {follow.followee.firstName} {follow.followee.lastName}
                                                              <div className='fs-5 text-secondary fw-normal'>
                                                                  @{follow.followee.handle}
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </Link>
                                )
                            }
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default Profile