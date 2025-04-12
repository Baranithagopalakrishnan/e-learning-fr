import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/contexts/CourseContext";
import { Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: Course;
  showEnrollButton?: boolean;
  onEnroll?: () => void;
  onUnenroll?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  showEnrollButton = true, 
  onEnroll,
  onUnenroll 
}) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="course-card overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        <Badge className={`absolute top-2 right-2 ${getLevelColor(course.level)}`}>
          {course.level}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{course.title}</CardTitle>
        <CardDescription>By {course.instructor}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="line-clamp-2 text-sm text-gray-600 mb-4">{course.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{course.students} students</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {showEnrollButton ? (
          <Button className="w-full" onClick={onEnroll}>
            Enroll Now
          </Button>
        ) : (
          <>
            <Button className="w-full" asChild>
              <Link to={`/course/${course.id}`}>Continue Learning</Link>
            </Button>
            {onUnenroll && (
              <Button 
                variant="outline" 
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={onUnenroll}
              >
                Unenroll
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
