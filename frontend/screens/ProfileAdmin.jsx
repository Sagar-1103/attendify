import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {useAuth} from "../context/AuthProvider";

export default function ProfileScreen() {
  const {user} = useAuth();
  
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri:user.image }} // Replace with user avatar URL
            style={styles.profileImage}
          />
          <View style={styles.profileText}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.id}>{user.post}, </Text>
            <Text style={styles.id}>Dept of {user.department}</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Text style={styles.icon}>▲</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.icon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Academic Details Section */}
      <LinearGradient
        colors={["#c5b4fc", "#d7aef8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.academicCard}
      >
        <Text style={styles.academicDetail}>DEPARTMENT: {user.department}</Text>
        <Text style={styles.academicDetail}>COURSES Assgn : 3</Text>
        <Text style={styles.academicDetail}>BATCHES Assgn: 3</Text>
        <Text style={styles.academicDetail}>Research/Teaching Experience: {user.exp}</Text>
      </LinearGradient>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <Text style={styles.courseDetails}>Date of Birth: - </Text>
        <Text style={styles.courseDetails}>Gender: {user.gender}</Text>
      </View>

      {/* Contact Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <Text  style={styles.courseDetails}>Contact no: {user.contact}</Text>
        <Text style={styles.courseDetails}>Email: {user.username}</Text>
      </View>

      {/* Current/Ongoing Courses Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current / Ongoing Courses</Text>
        <View style={styles.courseCard}>
          <Text style={styles.courseBadge}>B.Tech EC</Text>
          <Text style={styles.courseDetails}>
            Electronics and Communications Engineering {"\n"}
            Department of Engineering {"\n"}
            Sep 2025 - Dec 2025 {"\n"}
          </Text>
        </View>
        <View style={styles.courseCard}>
          <Text style={styles.courseBadge}>M.Tech EC</Text>
          <Text style={styles.courseDetails}>
            Electronics and Communications Engineering {"\n"}
            Department of Engineering {"\n"}
            Sep 2025 - Dec 2025 {"\n"}
          </Text>
        </View>
      </View>

      {/* Projects Section */}
      {["Projects", "Certifications", "Patents", "Extra Curricular Activities"].map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section}</Text>
          <Text style={styles.courseDetails}>You have not added any yet!</Text>
          <TouchableOpacity>
            <Text style={styles.addText}>+ Add new</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2C2C2C",
  },
  profileInfo: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#9747FF",
  },
  profileText: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2C2C2C",
  },
  id: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 12,
  },
  icon: {
    fontSize: 24,
    color: "#555",
  },
  academicCard: {
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    backgroundColor: "#d7aef8",
  },
  academicDetail: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 6,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C2C2C",
    marginBottom: 8,
  },
  editButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  editText: {
    color: "#9747FF",
    fontWeight: "600",
    fontSize: 14,
  },
  courseCard: {
    marginTop: 12,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#f1f3f6",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  courseBadge: {
    backgroundColor: "#9747FF",
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  courseDetails: {
    marginTop: 10,
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  addText: {
    color: "#9747FF",
    fontWeight: "600",
    fontSize: 15,
    marginTop: 10,
  },
});
