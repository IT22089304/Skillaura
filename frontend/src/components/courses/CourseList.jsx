import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Stack,
  Skeleton,
  Chip,
  IconButton,
  Pagination,
  TextField,
  InputAdornment,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const navigate = useNavigate();
const [subscriptionType, setSubscriptionType] = useState("free");
const [showUpgradeAlert, setShowUpgradeAlert] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        let url = `http://localhost:8080/api/courses`;
        
        if (searchQuery) {
          url += `/search?q=${encodeURIComponent(searchQuery)}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch courses");
        
        const data = await res.json();
        setCourses(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
const userId = localStorage.getItem("user");
if (userId) {
  fetch(`http://localhost:8080/api/users/${userId}`)
    .then(res => res.json())
    .then(data => setSubscriptionType(data.subscriptionType || "free"))
    .catch(err => console.error("Failed to fetch user subscription:", err));
}

    fetchCourses();
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handleMenuOpen = (event, courseId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourseId(courseId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCourseId(null);
  };

const handleStartCourse = (courseId, level) => {
  if (subscriptionType === "free" && level !== "Beginner") {
    setShowUpgradeAlert(true);
    return;
  }
  navigate(`/course/${courseId}`);
};

  const paginatedCourses = courses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: '100%', margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          Available Courses
        </Typography>
       
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={handleSearch}
        sx={{ mb: 4, maxWidth: 500 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {loading ? (
        <Grid container spacing={8}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: 500 }}>
                <Skeleton variant="rectangular" width="100%" height={180} />
                <CardContent>
                  <Skeleton width="80%" height={32} />
                  <Skeleton width="60%" height={24} sx={{ mt: 1 }} />
                  <Skeleton width="100%" height={72} sx={{ mt: 2 }} />
                  <Skeleton width="100%" height={36} sx={{ mt: 4 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : courses.length === 0 ? (
        <Box sx={{ 
          p: 4, 
          textAlign: 'center', 
          borderRadius: 3, 
          backgroundColor: 'background.paper',
          boxShadow: 1
        }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            {searchQuery ? "No courses match your search" : "No courses available yet"}
          </Typography>
          {!searchQuery && (
            <Button 
              variant="contained" 
              onClick={() => navigate('/add-course')}
            >
              Create Your First Course
            </Button>
          )}
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {paginatedCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card sx={{ 
                  width: '100%',
                  height: 500,
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-4px)',
                  }
                }}>
                  <Box sx={{ 
                    position: 'relative',
                    height: 180, 
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }} onClick={() => handleStartCourse(course.id, course.level)}
>
                    <CardMedia
                      component="img"
                      sx={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                      image={course.imageUrl || "https://via.placeholder.com/300x180?text=Course+Image"}
                      alt={course.title}
                    />
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8,
                      zIndex: 1
                    }}>
                      <Chip 
                        label={course.level} 
                        size="small" 
                        color={
                          course.level === 'Beginner' ? 'primary' : 
                          course.level === 'Intermediate' ? 'secondary' : 'error'
                        }
                      />
                    </Box>
                  </Box>

                  <CardContent sx={{ 
                    flexGrow: 1, 
                    p: 3, 
                    height: 320, 
                    display: 'flex', 
                    flexDirection: 'column',
                    overflow: 'hidden'
                  }}>
                    <Box sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 1
                    }}>
                      <Typography 
                        variant="h6"
                        sx={{ 
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '1.15rem',
                          lineHeight: 1.3,
                          '&:hover': {
                            color: 'primary.main',
                          }
                        }}
onClick={() => handleStartCourse(course.id, course.level)}
                      >
                        {course.title}
                      </Typography>
                      
                    </Box>

                    <Typography 
                      variant="subtitle2"
                      color="text.secondary" 
                      sx={{ 
                        display: 'block',
                        fontSize: '0.85rem',  
                        mb: 2,
                        lineHeight: 1.4
                      }}
                    >
                      {course.category && (
                        <Chip 
                          label={course.category} 
                          size="small" 
                          sx={{ mr: 1, mb: 1 }}
                        />
                      )}
                      {course.duration && `Duration: ${course.duration}`}
                    </Typography>

                    <Box sx={{ overflowY: 'auto', flexGrow: 1, mb: 2 }}>
                      <Typography 
                        variant="body1"
                        sx={{ 
                          fontSize: '0.95rem',
                          color: 'text.primary',
                          lineHeight: 1.6
                        }}
                      >
                        {course.description}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 'auto', pt: 2 }}>
                  <Button 
  fullWidth
  variant="contained"
  color="primary"
  size="medium" 
  onClick={() => handleStartCourse(course.id, course.level)} // ✅ Correct here!
  sx={{ 
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.95rem',
    py: 1
  }}
>
  Start Course
</Button>

                    </Box>
                    
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
{showUpgradeAlert && (
  <Box 
    sx={{ 
      position: 'fixed', 
      top: 0, left: 0, right: 0, bottom: 0, 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      bgcolor: 'rgba(0,0,0,0.5)', zIndex: 9999 
    }}
  >
    <Box 
      sx={{ 
        bgcolor: 'background.paper', 
        p: 4, 
        borderRadius: 3, 
        textAlign: 'center', 
        boxShadow: 24,
        maxWidth: 400 
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        🚀 Premium Feature
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        This course is only available for premium members. Upgrade to continue!
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setShowUpgradeAlert(false)}
      >
        Close
      </Button>
    </Box>
  </Box>
)}

    </Box>
  );
};

export default CourseList;
