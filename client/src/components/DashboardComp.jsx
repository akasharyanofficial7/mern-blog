import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import {
  HiAnnotation,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes, commentsRes] = await Promise.all([
          fetch("/api/user/getusers?limit=5"),
          fetch("/api/post/getposts?limit=5"),
          fetch("/api/comment/getcomments?limit=5"),
        ]);

        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setUsers(usersData.users);
          setTotalUsers(usersData.totalUsers);
          setLastMonthUsers(usersData.lastMonthUsers);
        } else {
          console.error("Failed to fetch users");
        }

        if (postsRes.ok) {
          const postsData = await postsRes.json();
          setPosts(postsData.posts);
          setTotalPosts(postsData.totalPosts);
          setLastMonthPosts(postsData.lastMonthPosts);
        } else {
          console.error("Failed to fetch posts");
        }

        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(commentsData.comments);
          setTotalComments(commentsData.totalComments);
          setLastMonthComments(commentsData.lastMonthComments);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchData();
    }
  }, [currentUser]);

  const barData = {
    labels: ["Users", "Posts", "Comments"],
    datasets: [
      {
        label: "Total",
        data: [totalUsers, totalPosts, totalComments],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Last Month",
        data: [lastMonthUsers, lastMonthPosts, lastMonthComments],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Dashboard Overview",
      },
    },
  };

  const pieData = {
    labels: ["Users", "Posts", "Comments"],
    datasets: [
      {
        label: "Overview",
        data: [totalUsers, totalPosts, totalComments],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 bg-gradient-to-r from-purple-600 to-indigo-600 text-white gap-4 md:w-72 w-full rounded-md shadow-lg transform hover:scale-105 transition-transform">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-300 text-md uppercase">Total Users</h3>
              <p className="text-3xl font-bold">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-md" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-300 flex items-center">
              +{lastMonthUsers}
            </span>
            <div className="text-gray-300">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 bg-gradient-to-r from-indigo-600 to-blue-600 text-white gap-4 md:w-72 w-full rounded-md shadow-lg transform hover:scale-105 transition-transform">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-300 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-3xl font-bold">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-md" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-300 flex items-center">
              +{lastMonthComments}
            </span>
            <div className="text-gray-300">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 bg-gradient-to-r from-green-600 to-lime-600 text-white gap-4 md:w-72 w-full rounded-md shadow-lg transform hover:scale-105 transition-transform">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-300 text-md uppercase">Total Posts</h3>
              <p className="text-3xl font-bold">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-md" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-300 flex items-center">
              +{lastMonthPosts}
            </span>
            <div className="text-gray-300">Last month</div>
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-md">
            <Bar data={barData} options={barOptions} />
          </div>
          <div className="w-full md:w-1/2 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-md">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
      <div className="flex-wrap flex gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto  p-4 rounded-md dark:bg-gray-800 bg-white transform hover:scale-105 transition-transform">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users.length ? (
              users.map((user) => (
                <Table.Body key={user._id} className="text-center">
                  <Table.Row>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="User"
                        className="w-10 h-10 rounded-full mx-auto"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))
            ) : (
              <Table.Body>
                <Table.Row>
                  <Table.Cell colSpan="2" className="text-center">
                    No users found
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto lg:ml-10  ml-0 p-4   rounded-md dark:bg-gray-800 bg-white transform hover:scale-105 transition-transform">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=posts"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {posts.length ? (
              posts.map((post) => (
                <Table.Body key={post._id} className="text-center">
                  <Table.Row>
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt="user"
                        className="w-14 h-10 rounded-md bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{post.title}</Table.Cell>
                    <Table.Cell className="w-5">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))
            ) : (
              <Table.Body>
                <Table.Row>
                  <Table.Cell colSpan="2" className="text-center">
                    No posts found
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto  mt-2 p-4 rounded-md dark:bg-gray-800 bg-white transform hover:scale-105 transition-transform">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment</Table.HeadCell>
              <Table.HeadCell>Post</Table.HeadCell>
            </Table.Head>
            {comments.length ? (
              comments.map((comment) => (
                <Table.Body key={comment._id} className="text-center">
                  <Table.Row>
                    <Table.Cell>{comment.content.slice(0, 50)}...</Table.Cell>
                    <Table.Cell>{comment.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))
            ) : (
              <Table.Body>
                <Table.Row>
                  <Table.Cell colSpan="2" className="text-center">
                    No comments found
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
}
