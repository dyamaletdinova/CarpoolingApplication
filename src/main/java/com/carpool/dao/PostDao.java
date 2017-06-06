/**
 * 
 */
package com.carpool.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.carpool.jdbc.DBConnection;
import com.carpool.model.Post;
//import com.mysql.cj.jdbc.PreparedStatement;
//import com.mysql.cj.jdbc.result.ResultSetMetaData;

/**
 * @author Diana Yamaletdinova
 *
 *         Apr 24, 2017
 */
public class PostDao {

	

	/*
	 * Get all posts by type
	 */
	public List<Post> getPostsByType(int type) {

		Connection conn = null;
		ResultSet rs = null;
		PreparedStatement stmt = null;
		List<Post> postsByUserList = new ArrayList<>();
		String sql = "select p.postid, p.userid, p.post, p.posttype, p.datecreated, u.userid, u.fullname from posts p, users u where p.userid = u.userid and postType = ? ORDER BY datecreated DESC";

		try {
			conn = DBConnection.getInstance().getConnection();
			
		
			
				stmt = (PreparedStatement) conn.prepareStatement(sql);
				stmt.setInt(1, type);
				rs = stmt.executeQuery();
				Post post = null;
				while (rs.next()) {
					post = new Post(rs.getInt(1), rs.getInt(2), rs.getString(3), rs.getInt(4), rs.getTimestamp(5),
							rs.getTimestamp(6), rs.getString(7), getTotalLikesForPost(conn,rs.getInt(1)));
					postsByUserList.add(post);
				}
	
			} catch (SQLException e) {
	
				e.printStackTrace();
			} finally {
				if (rs != null) {
					try {
						rs.close();
					} catch (SQLException ignore) {
					}
				}
				if (stmt != null) {
					try {
						stmt.close();
					} catch (SQLException ignore) {
					}
				}
				if (conn != null) {
					try {						
						conn.close();
					} catch (SQLException ignore) {}
				}
			}
			
		return postsByUserList;
	}
	
	private int getTotalLikesForPost(Connection conn, int postId) throws SQLException {
		
		int countTotal = 0;
		ResultSet rs = null;
		PreparedStatement stmt = null;
		
		try {
			String sql = "select count(*) from likes l where l.postId = ?";
			stmt = conn.prepareStatement(sql);
			
			stmt.setInt(1, postId);
			rs = stmt.executeQuery();
			rs.next();
			countTotal = rs.getInt(1);
			
		} finally {
			if ( rs != null ) rs.close();
			if ( stmt != null) stmt.close();
		}
		return countTotal;
	}
	
	/*
	 * get all posts by user Id
	 */
	public List<Post> getPostsByUserId(int userId) {
		Connection conn = null;
		ResultSet rs = null;
		PreparedStatement stmt = null;
		List<Post> postsByUserList = new ArrayList<>();
		String sql = "SELECT * FROM posts WHERE userid = ?";

		try {
			conn = DBConnection.getInstance().getConnection();
			stmt = (PreparedStatement) conn.prepareStatement(sql);
			stmt.setInt(1, userId);
			rs = stmt.executeQuery();

			Post post = null;

			while (rs.next()) {
				post = new Post(rs.getInt(1), rs.getInt(2), rs.getString(3), rs.getInt(4), rs.getTimestamp(5),
						rs.getTimestamp(6));
				postsByUserList.add(post);
			}
		} catch (SQLException e) {

			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException ignore) {
				}
			}
			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException ignore) {
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException ignore) {
				}
			}
		}

		return postsByUserList;
	}

	/**
	 * get one post
	 */
	public boolean addOnePost(Post post) {
		Connection conn = null;
		String sql = "INSERT INTO posts (userid, post, posttype) values(?,?,?)";
		PreparedStatement pstmt = null;

		try {
			conn = DBConnection.getInstance().getConnection();
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			pstmt.setInt(1, post.getUserId());
			pstmt.setString(2, post.getPostBody());
			pstmt.setInt(3, post.getPostType());

			return pstmt.executeUpdate() > 0;

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (conn != null)
					conn.close();

				if (pstmt != null)
					pstmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return false;
	}

	/*
	 * Delete a post by user id, post id and type
	 * 
	 */
	public boolean deletePostByUserID(int postId) {

		Connection conn = null;
		String sql = "DELETE FROM posts where postid = ?";
		PreparedStatement pstmt = null;
		//ResultSet rs = null;

		try {
			conn = DBConnection.getInstance().getConnection();
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			pstmt.setInt(1, postId);

			return pstmt.executeUpdate() > 0;

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (conn != null)
					conn.close();

				if (pstmt != null)
					pstmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return false;

	}
}
