import React, { createContext, useContext, useState, useEffect } from "react";
import { courses as defaultCourses } from "@/data/courses";

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  image: string;
  price: number;
  students: number;
  rating: number;
  status: "Active" | "Inactive";
  enrolledStudents: string[];
  isPublished: boolean;
}

interface CourseContextType {
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (courseId: string, updatedCourse: Course) => void;
  deleteCourse: (courseId: string) => void;
  getCourseById: (id: string) => Course | undefined;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      return JSON.parse(storedCourses);
    }
    // Initialize with default courses
    const initialCourses = defaultCourses.map(course => ({
      ...course,
      image: course.thumbnail,
      students: course.enrolledStudents,
      status: course.isPublished ? "Active" : "Inactive",
      enrolledStudents: [] // Initialize empty array for enrolled students
    }));
    localStorage.setItem("courses", JSON.stringify(initialCourses));
    return initialCourses;
  });

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const addCourse = (course: Course) => {
    setCourses((prevCourses) => [...prevCourses, course]);
  };

  const updateCourse = (courseId: string, updatedCourse: Course) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId ? updatedCourse : course
      )
    );
  };

  const deleteCourse = (courseId: string) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const getCourseById = (id: string) => {
    return courses.find((course) => course.id === id);
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        getCourseById,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
}; 