import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri:"https://nitgoa.ac.in/People/frontend/Dr.%20Mallikarjun%20Erramshetty.png" }} // Replace with user avatar URL
            style={styles.profileImage}
          />
          <View style={styles.profileText}>
            <Text style={styles.name}>Dr. Mallikarjun Erramshetty</Text>
            <Text style={styles.id}>Assistant Professor, </Text>
            <Text style={styles.id}>Dept of Electronics and Communications </Text>
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
        <Text style={styles.academicDetail}>DEPARTMENT: B.Tech. Electronics & Comm.</Text>
        <Text style={styles.academicDetail}>COURSES Assgn : 3</Text>
        <Text style={styles.academicDetail}>BATCHES Assgn: 3</Text>
        <Text style={styles.academicDetail}>Research/Teaching Experience: 5 years</Text>
      </LinearGradient>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <Text>Date of Birth: - </Text>
        <Text>Gender: MALE</Text>
      </View>

      {/* Contact Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <Text>Contact no: 1234567890</Text>
        <Text>Email: emallikarjuna@nitgoa.ac.in</Text>
        <Text>Address: 12, abc street, defgh, ijklm - 123456.</Text>
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
          <Text>You have not added any yet!</Text>
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
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileInfo: {
    flexDirection: "row",
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  profileText: {
    marginLeft: 20,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  id: {
    fontSize: 14,
    color: "#555",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  icon: {
    fontSize: 24,
  },
  academicCard: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  academicDetail: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  editText: {
    color: "#9747FF",
    fontWeight: "bold",
  },
  courseCard: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  courseBadge: {
    backgroundColor: "#9747FF",
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  courseDetails: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
  addText: {
    color: "#9747FF",
    fontWeight: "bold",
    marginTop: 10,
  },
});