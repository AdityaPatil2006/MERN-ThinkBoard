import Note from "../models/Notes.js";

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // ? Shows the newest notes first
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in Retriving Notes", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
    if (!note) return res.status(404).json({ message: "Note not Found!" });
  } catch {
    console.log("Error in Retriving Note", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(200).json(savedNote);
  } catch (error) {
    console.log("Error in Creating Note", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      },
    );
    if (!updateNote)
      return res.status(404).json({ message: "Note not Found!" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in Updating Note", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote)
      return res.status(404).json({ message: "Note not Found" });
    res.status(200).json({ message: "Note Deleted Successfully" });
  } catch (error) {
    console.log("Error in Deleting Note", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
