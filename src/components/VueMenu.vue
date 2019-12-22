<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">JDODGE</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">Link</b-nav-item>
                <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>

</template>
<script>
export default {
    data() {
        return {
            groups: [
                {
                    id: 1,
                    name: "To Do",
                    items: [
                        { id: 1, name: "Item 1", groupId: 1 },
                        { id: 2, name: "Item 2", groupId: 1 },
                        { id: 3, name: "Item 3", groupId: 1 }
                    ]
                },
                {
                    id: 2,
                    name: "In Progress",
                    items: [
                        { id: 4, name: "Item 4", groupId: 2 },
                        { id: 5, name: "Item 5", groupId: 2 },
                        { id: 6, name: "Item 6", groupId: 2 }
                    ]
                },
                {
                    id: 3,
                    name: "Done",
                    items: [
                        { id: 7, name: "Item 7", groupId: 3 },
                        { id: 8, name: "Item 8", groupId: 3 },
                        { id: 9, name: "Item 9", groupId: 3 },
                        { id: 10, name: "Item 10", groupId: 3 }
                    ]
                }
            ],
            options: {
                dropzoneSelector: ".drag-inner-list",
                draggableSelector: ".drag-item"
            }
        };
    },
    methods: {
        onGroupsChange(e) {
            console.log({ e });
        }
    }
};
</script>

<style lang="scss">
$ease-out: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
$to-do: #f4ce46;
$in-progress: #2a92bf;
$approved: #00b961;

* {
    box-sizing: border-box;
}

body {
    background: #33363d;
    color: white;
    font-family: "Roboto Mono", serif;
    font-weight: 300;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.drag-container {
    max-width: 1000px;
    margin: 20px auto;
}

.drag-list {
    display: flex;
    align-items: flex-start;

    @media (max-width: 690px) {
        display: block;
    }
}

.drag-column {
    flex: 1;
    margin: 0 10px;
    position: relative;
    background: rgba(black, 0.2);
    overflow: hidden;

    @media (max-width: 690px) {
        margin-bottom: 30px;
    }

    h2 {
        font-size: 0.8rem;
        margin: 0;
        text-transform: uppercase;
        font-weight: 600;
    }

    &-to-do {
        .drag-column-header,
        .drag-options {
            background: $to-do;
        }
    }

    &-in-progress {
        .drag-column-header,
        .drag-options {
            background: $in-progress;
        }
    }

    &-approved {
        .drag-column-header,
        .drag-options {
            background: $approved;
        }
    }
}

.drag-column-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    user-select: none;
}

.drag-inner-list {
    height: 85vh;
    overflow: auto;
}

.drag-item {
    margin: 10px;
    height: 100px;
    background: rgba(black, 0.4);
    transition: $ease-out;

    /* items grabbed state */
    &[aria-grabbed="true"] {
        background: #5cc1a6;
        color: #fff;
    }

    .drag-item-text {
        font-size: 1rem;
        padding-left: 1rem;
        padding-top: 1rem;
    }
}

.drag-header-more {
    cursor: pointer;
}

@keyframes nodeInserted {
    from {
        opacity: 0.2;
    }
    to {
        opacity: 0.8;
    }
}

.item-dropzone-area {
    height: 6rem;
    background: #888;
    opacity: 0.8;
    animation-duration: 0.5s;
    animation-name: nodeInserted;
    margin-left: 0.6rem;
    margin-right: 0.6rem;
}
</style>

