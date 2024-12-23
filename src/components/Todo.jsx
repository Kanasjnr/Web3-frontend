import React, { useState } from 'react';
import {
  AlertDialog,
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import useUpdateTodo from "../hooks/useUpdateTodo";
import useDeleteTodo from "../hooks/useDeleteTodo";
import useCompleteTodo from "../hooks/useCompleteTodo";

const Todo = ({ todo, index }) => {
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const completeTodo = useCompleteTodo();

  const { title, description, status } = todo;

  const [newFields, setNewFields] = useState({
    newtitle: title || "",
    newdescription: description || "",
  });

  const handleChange = (name, e) => {
    setNewFields((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const { newtitle, newdescription } = newFields;

  const handleTodoUpdate = () => {
    updateTodo(index, newtitle, newdescription);
  };

  const handleDelete = () => {
    deleteTodo(index);
  };

  const handleDone = () => {
    completeTodo(index);
  };

  return (
    <Box className="w-full">
      <Card variant="surface">
        <Flex direction="column" gap={6}>
          <Text as="div" size="2" weight="bold">
            Title
          </Text>
          <Text as="div" color="gray" size="2">
            {title}
          </Text>
          <Text as="div" size="2" weight="bold">
            Description
          </Text>
          <Text as="div" color="gray" size="2">
            {description}
          </Text>
          <Text as="div" size="2" weight="bold">
            Status
          </Text>
          <Text as="div" color="gray" size="2">
            {status}
          </Text>
        </Flex>

        <div className="w-full flex justify-start mt-4 items-center gap-4">
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button color="red">Delete</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: '450px' }}>
              <AlertDialog.Title>Delete Todo</AlertDialog.Title>
              <AlertDialog.Description size="2">
                Are you sure? If you delete this todo, you will not be able to
                recover it.
              </AlertDialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button onClick={handleDelete} variant="solid" color="red">
                    Delete
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>

          <Dialog.Root>
            <Dialog.Trigger>
              <Button color="orange">Edit</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: '450px' }}>
              <Dialog.Title>Edit Todo</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Edit Your Todo Here.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Todo Title
                  </Text>
                  <TextField.Input
                    placeholder="Enter title"
                    value={newFields.newtitle}
                    onChange={(e) => handleChange("newtitle", e)}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Todo Description
                  </Text>
                  <TextArea
                    placeholder="Enter description"
                    value={newFields.newdescription}
                    onChange={(e) => handleChange("newdescription", e)}
                  />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button onClick={handleTodoUpdate}>
                    Update
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>

          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button color="green">Done</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: '450px' }}>
              <AlertDialog.Title>Completed Todo</AlertDialog.Title>
              <AlertDialog.Description size="2">
                Are you sure you&apos;ve completed this task?
              </AlertDialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button onClick={handleDone} variant="solid" color="green">
                    Yes, I have
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </div>
      </Card>
    </Box>
  );
};

export default Todo;

